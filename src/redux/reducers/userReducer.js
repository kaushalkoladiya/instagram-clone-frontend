import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';


const initialState = {
  isAuth: false,
  user: {},
  likes: [],
  notifications: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuth: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        isAuth: true,
        ...action.payload
      };

    default:
      return state;
  }
}