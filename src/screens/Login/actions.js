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
  UPDATE_USER_AVATAR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_SUCCESS
} from './constants';

export const login = data => ({type: LOGIN, data});
export const loginSuccess = payload => ({type: LOGIN_SUCCESS, payload});
export const loginError = error => ({type: LOGIN_ERROR, error});

export const register = data => ({type: REGISTER, data});
export const registerSuccess = payload => ({type: REGISTER_SUCCESS, payload});

export const updateUser = data => ({type: UPDATE_USER, data});
export const updateUserSuccess = payload => ({type: UPDATE_USER_SUCCESS, payload});

export const getUser = data => ({type: GET_USER, data});
export const getUserSuccess = payload => ({type: GET_USER_SUCCESS, payload});

export const updateUserAvatar = data => ({type: UPDATE_USER_AVATAR, data});
export const updateUserAvatarSuccess = payload => ({type: UPDATE_USER_AVATAR_SUCCESS, payload});

export const logoutAction = () => ({type: LOGOUT});
