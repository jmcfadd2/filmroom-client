import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_PROGRESS,
    SET_PIC_STATUS,
    SET_VID_STATUS
} from '../types';

const initialState = {
    loading: false,
    errors: null,
    progress: null,
    videoStatus: null,
    imageStatus: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                    errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case SET_PROGRESS:
            return {
                ...state,
                progress: action.payload
            };
        case SET_VID_STATUS:
            return {
                ...state,
                videoStatus: action.payload
            };
        case SET_PIC_STATUS:
            return {
                ...state,
                imageStatus: action.payload
            };
        default:
            return state;
    }
}