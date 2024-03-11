import {takeLatest, put, call} from "redux-saga/effects";
import {axios} from "../../config";
import toastAlert from "../../utils/toast";
import {navigate} from "../../config/Navigator";
import {
  createProjectSuccess,
  getInvitationsSuccess,
  getProjectsSuccess, updateInvitation,
} from "./actions";
import {
  ACCEPT_INVITATION, CREATE_NOTIFICATION,
  CREATE_PROJECT, DECLINE_INVITATION,
  GET_INVITATIONS,
  GET_PROJECTS,
} from "./constants";

export function* getProjects() {
  const res = yield call(axios.get, '/project');
  yield put(getProjectsSuccess(res.data))
}

export function* createProject(action) {
  try {
    const res = yield call(axios.post, '/project', {name: action.data.name});
    yield put(createProjectSuccess(res.data));
    navigate('Project', {screen: 'Board', params: {id: res.data._id}})
  } catch (e) {
    toastAlert('error', e?.response?.data?.message || 'An error occurred');
  }
}

export function* acceptInvitation(action) {
  try {
    yield call(axios.post, '/user/invitation/accept', {invitationId: action.data});
    yield put(updateInvitation(action.data));
    toastAlert('success', 'Invitation accepted');
  } catch (e) {
    toastAlert('error', e?.response?.data?.message || 'An error occurred');
  }
}

export function* declineInvitation(action) {
  try {
    yield call(axios.post, '/user/invitation/decline', {invitationId: action.data});
    yield put(updateInvitation(action.data));
    toastAlert('success', 'Invitation declined');
  } catch (e) {
    toastAlert('error', e?.response?.data?.message || 'An error occurred');
  }
}

export function* getInvitations() {
  const res = yield call(axios.get, '/user/invitations');
  yield put(getInvitationsSuccess(res.data));
}

export function* createNotification(action) {
  yield call(axios.post, '/notification', action.data);
}

export default function* () {
  yield takeLatest(GET_INVITATIONS, getInvitations);
  yield takeLatest(GET_PROJECTS, getProjects);
  yield takeLatest(ACCEPT_INVITATION, acceptInvitation);
  yield takeLatest(DECLINE_INVITATION, declineInvitation);
  yield takeLatest(CREATE_PROJECT, createProject);
  yield takeLatest(CREATE_NOTIFICATION, createNotification);
}
