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
    STAGE_SESSION,
    ADD_NEW_DRILL,
    SET_DRILLS,
    ADD_DRILL,
    UPDATE_RESULTS,
    SET_TITLE,
    SET_DESCRIPT,
    SUBMIT_COMMENT
} from '../types';
import firebase from '../../util/firebase'
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

export const finishSession = (newSession) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post('/session/stage', newSession)
        .then((res) => {
            console.log(res)
            dispatch({
                type: STAGE_SESSION,
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

export const getUserDrills = (userHandle) => (dispatch) => {

    axios
        .get(`/drills/${userHandle}`)
        .then((res) => {
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

export const updateResults = (results, drillName, drillId) => (dispatch) => {
    
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

export const postSession = (sessionId, newSessionPost) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios
        .post(`/post/${sessionId}`, newSessionPost)
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



export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};