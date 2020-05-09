import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST } from '../types';


const initialState = {
  isAuth: false,
  loading: false,
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
        loading: false,
        ...action.payload
      };

    case LOADING_USER:
      return {
        ...state,
        loading: true
      }

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.user.username,
            postId: action.payload.post.postId
          }
        ]
      }

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload.post.postId)
      }

    default:
      return state;
  }
}