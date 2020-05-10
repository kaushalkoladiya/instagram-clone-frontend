import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_AS_READ } from '../types';


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios.post('/login', userData)
    .then(({ data: { token } }) => {
      setAuthorizationHeader(token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');

    })
    .catch(({ response: { data: { error } } }) => {
      dispatch({
        type: SET_ERRORS,
        payload: error
      })
    });
}

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios.post('/signup', userData)
    .then(({ data: { token } }) => {
      setAuthorizationHeader(token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');

    })
    .catch(({ response: { data: { error } } }) => {
      dispatch({
        type: SET_ERRORS,
        payload: error
      })
    });
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get('/user')
    .then(({ data: { userData } }) => {
      dispatch({
        type: SET_USER,
        payload: userData
      })
    })
    .catch(err => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user/profile/image', formData)
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err.response));
}

export const editUserDetails = (userData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user/update', userData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err.response));
}

export const markAsRead = (notificationIds) => (dispatch) => {
  axios.post('/notification', notificationIds)
    .then(() => {
      dispatch({ type: MARK_AS_READ });
    })
    .catch(err => console.log(err.response));
}

const setAuthorizationHeader = token => {
  const bearerToken = `Bearer ${token}`;
  localStorage.setItem('token', bearerToken);
  axios.defaults.headers.common['Authorization'] = bearerToken;
}