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
    SET_SESSION,
    CREATE_SESSION,
    ADD_NEW_DRILL,
    ADD_DRILL,
    CREATE_SESSION_POST,
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

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

export const createPost = (newPost) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/post', newPost)
        .then((res) => {
            dispatch({
                type: CREATE_POST,
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

export const setSession = (prepSession) => (dispatch) => {
    dispatch({
        type: SET_SESSION,
        payload: prepSession
    })
}

export const createSession = (newSession) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/session', newSession)
        .then((res) => {
            dispatch({
                type: CREATE_SESSION,
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
export const addNewDrill = (newDrill) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/drill', newDrill)
        .then((res) => {
            dispatch({
                type: ADD_NEW_DRILL,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        
};

export const postSession = (sessionId) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post(`/post/${sessionId}`, sessionId)
        .then((res) => {
            dispatch({
                type: CREATE_SESSION_POST,
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



export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

