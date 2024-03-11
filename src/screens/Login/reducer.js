import produce from 'immer';
import {SET_NOTIFICATIONS_SEEN} from "../Dashboard/constants";
import {CREATE_CONVERSATION_SUCCESS} from "../Messages/constants";
import {
  GET_USER,
  GET_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_SUCCESS
} from './constants';

export const initialState = {
  isLogin: false,
  user: {
    data: {},
    loading: false
  }
};

export default function (state = initialState, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
      case REGISTER:
      case GET_USER:
      case UPDATE_USER:
        draft.user.loading = true;
        break;
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        draft.user.data = {...state.user.data, ...action.payload};
        draft.isLogin = true;
        draft.user.loading = false;
        break;
      case LOGIN_ERROR:
        draft.user.loading = false;
        break;
      case GET_USER_SUCCESS:
      case UPDATE_USER_SUCCESS:
        draft.user.data = {...state.user.data, ...action.payload};
        draft.user.loading = false;
        break;
      case SET_NOTIFICATIONS_SEEN:
        draft.user.data.notifications = state.user.data.notifications.map(n => action.data.ids.includes(n._id) ? {...n, seen: true} : n);
        break;
      case UPDATE_USER_AVATAR_SUCCESS:
        draft.user.data.avatar = action.payload + '?v=' + new Date();
        break;
      case CREATE_CONVERSATION_SUCCESS:
        if (action.payload.user && !state.user.data.contacts.find(u => u._id === action.payload.user._id))
          draft.user.data.contacts.push(action.payload.user);
        break;
      case LOGOUT:
        return initialState;

      default:
        return state;
    }
  });
}
