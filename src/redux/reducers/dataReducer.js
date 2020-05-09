import { LOADING_DATA, LIKE_POST, UNLIKE_POST, SET_POSTS } from '../types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }

    case LOADING_DATA:
      return {
        loading: true,
        ...state
      }

    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(post => post.postId === action.payload.post.postId);
      state.posts[index] = action.payload.post;
      return {
        ...state
      }
    default:
      return state;
  }
}