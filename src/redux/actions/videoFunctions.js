import * as UpChunk from "@mux/upchunk";
import { SET_PROGRESS, SET_VID_STATUS, STOP_LOADING_UI } from "../types";

export const uploadVideos =  (response, videos) => async (dispatch) => {
  console.log(videos);
  if (videos[0]) {
    console.log('if is running');
    let uploadsCompleted = 0
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const upload = UpChunk.createUpload({
        endpoint: response.data.uploadUrls[i],
        file: video,
        chunkSize: 20971520,
      })
      upload.on('progress', progress => {
        const videoStatus = `So far we've uploaded ${progress.detail.toPrecision(3)}% of video #${i + 1}.`
        dispatch({
          type: SET_PROGRESS,
          payload: progress.detail.toPrecision(3)
        })
        dispatch({
          type: SET_VID_STATUS,
          payload: videoStatus
        })
      })

      // eslint-disable-next-line no-loop-func
      upload.on('success', () => {
        uploadsCompleted++
        console.log("Uploads completed :", uploadsCompleted
        );
        uploadsCompleted === videos.length && setTimeout(() => {
          window.location.href = '/'
          dispatch({
            type: SET_VID_STATUS,
            payload: "Video uploads completed, putting things in their place"
          })
        }, 5000)
      })
    }
  } else {
    setTimeout(() => {
      window.location.href = '/'
      dispatch({
        type: STOP_LOADING_UI
      })
    }, 2000)
  }
}

export const uploadOneVideo =  (response, video) => async (dispatch) => {
  const uploadVideo = video !== undefined && await UpChunk.createUpload({
    endpoint: response.data.uploadUrl,
    file: video,
    chunkSize: 20971520,
  })
  uploadVideo.on('progress', progress => {
    console.log(`So far we've uploaded ${progress.detail}% of this file.`);
  })
}


