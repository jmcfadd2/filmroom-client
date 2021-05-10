import axios from 'axios'
import {
  SET_COURSE_TOPIC,
  SET_COURSE_DRILLS,
  LOADING_DATA,
  SET_PROGRESS,
  SET_VID_STATUS,
  SET_COURSE_ID,
  LOADING_UI,
  SET_UPLOAD_SUCCESS,
  LOADING_COURSES,
  SET_COURSES,
  SET_COURSE_INFO
} from '../types'
import * as UpChunk from '@mux/upchunk'
import { getUserData } from './userActions';


export const getCourses = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  axios

    .get('/courses')
    .then((res) => {

      dispatch({
        type: SET_COURSES,
        payload: res.data
      });
      console.log(res.data)
    })
    .catch((err) => {
      dispatch({
        type: SET_COURSES,
        payload: []
      });
    });
};

export const getCourseData = (courseId) => (dispatch) => {
  dispatch({
    type: LOADING_COURSES
  });
  axios
    .get(`/courses/${courseId}`)
    .then((res) => {
      dispatch({
        type: SET_COURSE_INFO,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: SET_COURSE_INFO,
        payload: null
      });
    });
};


export const setTopic = (newTopic) => (dispatch) => {
  dispatch({
    type: SET_COURSE_TOPIC,
    payload: newTopic
  })
}
export const setDrills = (newDrills) => (dispatch) => {
  dispatch({
    type: SET_COURSE_DRILLS,
    payload: newDrills
  })
}

export const createCourse = async (newCourse, video) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  })
  dispatch({
    type: SET_UPLOAD_SUCCESS,
    payload: false
  })
  axios
    .post('/courses/create', newCourse)
    .then(async (res) => {

      const upload = typeof video !== undefined && await UpChunk.createUpload({
        endpoint: res.data.uploadUrl,
        file: video,
        chunkSize: 20971520,
      })
      upload.on('progress', progress => {
        const videoStatus = `So far we've uploaded ${progress.detail.toPrecision(3)}% of preview video.`
        dispatch({
          type: SET_PROGRESS,
          payload: progress.detail.toPrecision(3)
        })
        dispatch({
          type: SET_VID_STATUS,
          payload: videoStatus
        })
      })

      upload.on('success', () => {
        dispatch({
          type: SET_COURSE_ID,
          payload: res.data.courseId
        })
        dispatch({
          type: SET_UPLOAD_SUCCESS,
          payload: true
        })
       
      })
    })
}
export const uploadCourseVideos = (courseInfo, courseId, videos) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  })
  axios
    .post(`/courses/${courseId}/upload-videos`, courseInfo)
    .then(async (res) => {
      console.log(res.data.uploadUrls)
      let uploadsCompleted = 0
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const upload = typeof video !== undefined && await UpChunk.createUpload({
          endpoint: res.data.uploadUrls[i],
          file: video,
          chunkSize: 20971520,
        })
        // eslint-disable-next-line no-loop-func
        upload.on('progress', progress => {
          const videoStatus = `So far we've uploaded ${progress.detail.toPrecision(3)}% of video #${i+1}.`
          dispatch({
            type: SET_PROGRESS,
            payload: progress.detail.toPrecision(3)
          })
          dispatch({
            type: SET_VID_STATUS,
            payload: videoStatus
          })
          upload.on('success', () => {
            uploadsCompleted++
            console.log("Uploads completed :", uploadsCompleted);
            uploadsCompleted === videos.length && dispatch({
              type: SET_UPLOAD_SUCCESS,
              payload: true
            })
          })
        })
      }
    })
}

export const uploadCourseDrills = (drills, courseId, videos) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  })
  axios
    .post(`/courses/${courseId}/drills`, {
      drills: drills, 
      drillCount: drills.length
    })
    .then(async (res) => {
      let uploadsCompleted = 0
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const upload = typeof video !== undefined && await UpChunk.createUpload({
          endpoint: res.data.uploadUrls[i],
          file: video,
          chunkSize: 20971520,
        })
        // eslint-disable-next-line no-loop-func
        upload.on('progress', progress => {
          const videoStatus = `So far we've uploaded ${progress.detail.toPrecision(3)}% of video #${i+1}.`
          dispatch({
            type: SET_PROGRESS,
            payload: progress.detail.toPrecision(3)
          })
          dispatch({
            type: SET_VID_STATUS,
            payload: videoStatus
          })
          upload.on('success', () => {
            uploadsCompleted++
            console.log("Uploads completed :", uploadsCompleted);
            uploadsCompleted === videos.length && 
              dispatch({
                type: SET_UPLOAD_SUCCESS,
                payload: true
              })
              
          })
        })
      }
    })
}

export const addCourseToLibrary = (courseInfo) => (dispatch) => {
  dispatch({
    type: LOADING_COURSES
  })
  const newRequest = {
      drillInfo: courseInfo.drillInfo,
      drillVideos: courseInfo.drillVideos,
      instructor: courseInfo.instructor,
      courseId: courseInfo.courseId,
      
  }
  axios
    .post('/courses/add', newRequest)
    .then((res) => {
      console.log(res);
      dispatch(getUserData())
    })
    .catch((err) => {
      console.log(err);
    })
}