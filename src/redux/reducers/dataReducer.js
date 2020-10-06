
import {
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_DATA,
    DELETE_POST,
    CREATE_POST,
    SET_POST,
    SUBMIT_COMMENT,
    SET_TOPIC,
    SET_TYPE,
    STAGE_SESSION,
    ADD_NEW_DRILL,
    SET_DRILLS,
    ADD_DRILL,
    SET_DESCRIPT,
    SET_TITLE,
    UPDATE_RESULTS,
    CREATE_SESSION_POST
} from '../types';

const initialState = {
    posts: [],
    post: {},
    session: {
        drills: [],
        drillResults: []
    },
    yourDrills: [],
    loading: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                    loading: false
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload
            };
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                (post) => post.postId === action.payload.postId
            );
            state.posts[index] = action.payload;
            if (state.post.postId === action.payload.postId) {
                state.post = action.payload;
            }
            return {
                ...state
            };
        case DELETE_POST:
            index = state.posts.findIndex(
                (post) => post.postId === action.payload
            );
            state.posts.splice(index, 1);
            return {
                ...state
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                }
            };
        case SET_TOPIC:
            return {
                ...state,
                session: {
                    ...state.session, 
                    topic: action.payload 
                    
                }
            };
        case SET_TYPE:
            return {
                ...state,
                session: {
                    ...state.session, 
                    type: action.payload 
                    
                }
            };
            case ADD_NEW_DRILL:
                return {
                    ...state,
                    session: {
                        ...state.session,
                        drills: [...state.session.drills, action.payload]
                    }
                }
            
        case SET_DRILLS:
            return {
                ...state,
                yourDrills: action.payload,
                    
            };
        case ADD_DRILL:
            let drillIndex = state.yourDrills.findIndex(
                (drill) => drill.name === action.payload
                
            );
             
            return {
                ...state,
                session: {
                    ...state.session,
                    drills: [...state.session.drills, state.yourDrills[drillIndex]]
                }
            }
        case UPDATE_RESULTS:
            return {
                ...state,
                session: {
                    ...state.session,
                    drillResults: [...state.session.drillResults, action.payload]
                }
            };
        case STAGE_SESSION:
            return {
                ...state,
                session: action.payload
            };
                default:
                    return state;
    }
}