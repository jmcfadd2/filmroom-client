/* eslint-disable no-loop-func */
import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  CREATE_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  GET_TOPICS,
  SET_TOPIC,
  SET_TYPE,
  SET_SESSION,
  ADD_NEW_DRILL,
  SET_DRILLS,
  ADD_DRILL,
  UPDATE_RESULTS,
  SET_TITLE,
  SET_DESCRIPT,
  SUBMIT_COMMENT,
  SET_VID_STATUS,
  SET_PROGRESS
} from '../types';
import { firebase } from '../../util/firebase'
import axios from 'axios';
import { uploadOneVideo, uploadVideos } from './videoFunctions';
import * as UpChunk from "@mux/upchunk";


export const getPosts = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  axios

    .get('/posts')
    .then((res) => {

      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
      console.log(res.data)
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch((err) => console.log(err));
};

export const createPost = (newPost, video, image) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post('/post', newPost)
    .then(async (res) => {
      if (video) {
        uploadOneVideo(res, video)
      }

      image !== undefined && await
        firebase.storage().ref('post-pics')
          .child(image.name)
          .put(image)
          .then(() => {

            console.log(`Uploaded file: ${image.name}`)
            firebase.storage().ref('post-pics')
              .child(image.name).getDownloadURL().then((url) => {
                firebase.firestore().collection('posts').doc(`${res.data.postId}`).update({
                  imageUrl: url
                })
              })
          })
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data
      });
    });
};



export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
}

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    })
    .catch((err) => console.log(err));
};

export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
    });
};
export const getTopicData = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  firebase
    .firestore()
    .collection("topics")
    .get()
    .then((data) => {
      let topics = []
      data.forEach((doc) => {
        topics.push({
          name: doc.data().name,
          sessionTypes: doc.data().sessionTypes,
          metrics: doc.data().metrics,
          subActivity: doc.data().subActivity

        })

      })
      dispatch({
        type: GET_TOPICS,
        payload: topics
      })
    })
};



export const setTopic = (newTopic) => (dispatch) => {
  dispatch({
    type: SET_TOPIC,
    payload: newTopic
  })
}
export const setType = (newType) => (dispatch) => {
  dispatch({
    type: SET_TYPE,
    payload: newType
  })
}

export const setSession = (sessionData) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  const session = {
    session: sessionData
  }
  axios
    .post('/session', session)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_SESSION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const stageSession = (sessionData) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  const session = {
    drillResults: sessionData
  }
  axios
    .post('/session/stage', session)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_SESSION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const addNewDrill = (newDrill, video) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post('/drill', newDrill)
    .then(async (res) => {

      uploadOneVideo(res, video)

      dispatch({
        type: ADD_NEW_DRILL,
        payload: res.data
      });
      dispatch(clearErrors());
    })

};

export const getUserDrills = (userHandle, topic, type) => (dispatch) => {

  axios
    .get(`/drills/${userHandle}/${topic}/${type}`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_DRILLS,
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: SET_DRILLS,
        payload: ["No drills available"]
      })
    })
}
export const getGenericDrills = (topic, type) => (dispatch) => {

  axios
    .get(`/drills/${topic}/${type}`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_DRILLS,
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: SET_DRILLS,
        payload: ["No drills available"]
      })
    })
}

export const addDrillToSession = (drillName) => (dispatch) => {
  dispatch({
    type: ADD_DRILL,
    payload: drillName
  })
}

export const updateResults = (results, drillName, drillId, sessionId, image) => async (dispatch) => {
  dispatch({
    type: LOADING_UI

  })

  image && await
    firebase.storage().ref('post-pics')
      .child(image.name)
      .put(image)
      .then(() => {

        console.log(`Uploaded file: ${image.name}`)
        firebase.storage().ref('post-pics')
          .child(image.name).getDownloadURL().then((url) => {
            firebase.firestore().collection('posts').doc(`${sessionId}`).update({
              images: firebase.firestore.FieldValue.arrayUnion(url)
            })
          })
      })
  dispatch({
    type: UPDATE_RESULTS,
    payload: {
      drillName,
      drillId,
      results

    }
  });
  dispatch(clearErrors());

}

export const setTitle = (newTitle) => (dispatch) => {
  dispatch({
    type: SET_TITLE,
    payload: newTitle
  })
}
export const setDescript = (newDescript) => (dispatch) => {
  dispatch({
    type: SET_DESCRIPT,
    payload: newDescript
  })
}

export const postSession = (sessionId, newSessionPost, videos, images) => async (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post(`/post/${sessionId}`, newSessionPost)
    .then(async (res) => {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await firebase.storage().ref('post-pics')
          .child(image.name)
          .put(image)
          .then(() => {

            firebase.storage().ref('post-pics')
              .child(image.name).getDownloadURL().then((url) => {
                firebase.firestore().collection('posts').doc(`${res.data.postId}`).update({
                  images: firebase.firestore.FieldValue.arrayUnion(url)
                })
              })
          })
      }
      
  if (videos[0]) {
    let uploadsCompleted = 0;
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const upload = UpChunk.createUpload({
        endpoint: res.data.uploadUrls[i],
        file: video,
        chunkSize: 20971520,
      });
      upload.on("progress", (progress) => {
        const videoStatus = `So far we've uploaded ${progress.detail.toPrecision(
          3
        )}% of video #${i + 1}.`;
        dispatch({
          type: SET_PROGRESS,
          payload: progress.detail.toPrecision(3),
        });
        dispatch({
          type: SET_VID_STATUS,
          payload: videoStatus,
        });
      });

      upload.on("success", () => {
        uploadsCompleted++;
        uploadsCompleted === videos.length &&
          setTimeout(() => {
            window.location.href = "/";
            dispatch({
              type: SET_VID_STATUS,
              payload: "Video uploads completed, putting things in their place",
            });
          }, 5000);
      });
    }
  } else {
    setTimeout(() => {
      window.location.href = "/";
      dispatch({
        type: STOP_LOADING_UI,
      });
    }, 2000);
  }


    })

};



export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
};