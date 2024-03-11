import {put, call, takeLatest} from 'redux-saga/effects';
import {axios} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setNotificationUserId} from "../../config/NotificationService";
import {SET_NOTIFICATIONS_SEEN} from "../Dashboard/constants";
import toastAlert from "../../utils/toast";
import {replace} from '../../config/Navigator';
import {GET_USER, LOGIN, REGISTER, UPDATE_USER, UPDATE_USER_AVATAR} from './constants';
import {
  getUserSuccess,
  loginError,
  loginSuccess,
  registerSuccess,
  updateUserAvatarSuccess,
  updateUserSuccess
} from './actions';

export function* loginRequest(action) {
  try {
    const {email, password} = action.data;
    const res = yield call(axios.post, '/user/login', {email: email.replace(/ /g, ''), password});
    const {token} = res.data;
    yield AsyncStorage.setItem("token", token);
    yield call(axios.setToken, token);
    yield put(loginSuccess(res.data));
    setNotificationUserId(res.data._id);
    replace('Home');
  } catch (e) {
    toastAlert('error', e?.response?.data?.message || 'An error occurred');
    yield put(loginError(e));
  }
}

export function* registerRequest(action) {
  try {
    const {firstName, lastName, email, password} = action.data;
    const res = yield call(axios.post, '/user', {firstName, lastName, password, email: email.replace(/ /g, '')});
    const {token} = res.data;
    yield AsyncStorage.setItem("token", token);
    yield call(axios.setToken, token);
    yield put(registerSuccess(res.data));
    setNotificationUserId(res.data._id);
    replace('Home');
  } catch (e) {
    toastAlert('error', e?.response?.data?.message || 'An error occurred');
    yield put(loginError(e));
  }
}

export function* getUser() {
  const res = yield call(axios.get, '/user');
  yield put(getUserSuccess(res.data));
}

export function* updateUser(action) {
  const res = yield call(axios.put, '/user', action.data);
  yield put(updateUserSuccess(res.data));
  toastAlert('success', 'Profile updated');
}

export function* setNotificationsSeen(action) {
  yield call(axios.put, '/notification/setSeen', action.data);
}

export function* updateAvatar(action) {
  const res = yield call(axios.put, '/user/avatar', action.data, {headers: {"Content-Type": "multipart/form-data"}});
  yield put(updateUserAvatarSuccess(res.data.path));
}

export default function* () {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, registerRequest);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(UPDATE_USER, updateUser);
  yield takeLatest(SET_NOTIFICATIONS_SEEN, setNotificationsSeen);
  yield takeLatest(UPDATE_USER_AVATAR, updateAvatar);
}
