import {
  LOADING_DATA,
  SET_COURSE_TOPIC,
  SET_COURSE_DRILLS,
  SET_COURSE_ID,
  SET_UPLOAD_SUCCESS,
  LOADING_COURSES,
  SET_COURSES,
  SET_COURSE_INFO
} from '../types'

const initialState = {
  drills: [],
  topic: 0,
  loading: false,
  courses: [],
  info: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    
    case LOADING_COURSES:
      return {
        ...state,
        loading: true
      }
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload
      }
    case SET_COURSE_INFO:
      return {
        ...state,
        info: action.payload
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