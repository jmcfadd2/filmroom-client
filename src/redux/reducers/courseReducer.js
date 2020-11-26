import {
  LOADING_DATA,
  SET_COURSE_TOPIC,
  SET_COURSE_DRILLS,
  SET_COURSE_ID,
  SET_UPLOAD_SUCCESS,
  LOADING_COURSES
} from '../types'

const initialState = {
  drills: [],
  topic: 0,
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    
    case LOADING_COURSES:
      return {
        ...state,
        loading: true
      }
    case SET_COURSE_TOPIC:
      return {
        ...state,
        topic: action.payload
      }
    case SET_COURSE_DRILLS:
      return {
        ...state,
        drills: [...state.drills, action.payload]
      }
    case SET_COURSE_ID:
      return {
        ...state,
        courseId: action.payload,
        loading: false
      }
    case SET_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadSuccess: action.payload,
        loading: false
      }
      default:
        return state;
  }
}