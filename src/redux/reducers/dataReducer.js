import {
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_DATA,
    DELETE_POST,
    CREATE_POST,
    SET_POST,
    SUBMIT_COMMENT, 
    SET_SESSION, 
    CREATE_SESSION,
    ADD_NEW_DRILL,
    ADD_DRILL
} from '../types';

const initialState = {
    posts: [],
    post: {},
    drills: [],
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
        case SET_SESSION:
                return {
                    ...state,
                    session: action.payload, ...state.session
                };
        case CREATE_SESSION:
            return {
                ...state,
                session: action.payload
            };
        case ADD_NEW_DRILL:
            return {
                ...state,
                    drills: [...state.drills, action.payload]
            }
        case ADD_DRILL:
            return {
                ...state,
                session: {
                    ...state.session,
                    drills: [action.payload, ...state.drills]
                 }
            }
        default:
            return state;
    }
}