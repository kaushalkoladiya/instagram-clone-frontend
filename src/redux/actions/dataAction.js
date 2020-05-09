import { SET_POSTS, UNLIKE_POST, LIKE_POST, LOADING_DATA, DELETE_POST, LOADING_UI, ADD_POST, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/post')
    .then(({ data: { posts } }) => {
      dispatch({
        type: SET_POSTS,
        payload: posts
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      })
    });
}

export const likePost = (postId) => (dispatch) => {
  axios.post(`/like/${postId}/store`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    })
    .catch((err) => console.log(err.response))
}

export const unlikePost = (postId) => (dispatch) => {
  axios.post(`/like/${postId}/delete`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      })
    })
    .catch((err) => console.log(err.response))
}

export const deletePost = (postId) => (dispatch) => {
  axios.delete(`/post/${postId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    })
    .catch((err) => console.log(err));
}

export const addPost = (postData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/post', postData)
    .then(({ data: { post } }) => {
      dispatch({
        type: ADD_POST,
        payload: post
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(({ response: { data: { error } } }) => {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      })
    });
}