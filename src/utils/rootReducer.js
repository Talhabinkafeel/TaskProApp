import {combineReducers} from 'redux';

import authReducer from '../screens/Login/reducer';
import dashboardReducer from '../screens/Dashboard/reducer';
import projectReducer from '../screens/Project/reducer';
import chatReducer from '../screens/Messages/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  project: projectReducer,
  chat: chatReducer
});

export default rootReducer;
