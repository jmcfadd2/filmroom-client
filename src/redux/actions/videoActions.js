import {
    UPLOAD_DRILL_VIDEO,
    LOADING_DATA
    
} from '../types'
import  { UpChunk } from '@mux/upchunk'
import axios from 'axios';


export const uploadDrillVideo = (file) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });
    const getUploadUrl = axios
        .get('/video/upload')
        .then((res) => {
            console.log(`Res.data = ${res.data }`)
            const uploadUrl = res.data
            return uploadUrl

        })
        .catch((err) => console.log(err));
    
    const upload = UpChunk.createUpload({
        endpoint: getUploadUrl,
        file: file,
        chunkSize: 5120,
    })

    
}