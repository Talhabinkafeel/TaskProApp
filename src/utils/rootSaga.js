import {all} from "redux-saga/effects";
import authSaga from '../screens/Login/saga';
import dashboardSaga from '../screens/Dashboard/saga';
import projectSaga from '../screens/Project/saga';
import chatSaga from '../screens/Messages/saga';

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), projectSaga(), chatSaga()]);
}
