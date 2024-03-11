import produce from 'immer';
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS,
  GET_INVITATIONS,
  GET_INVITATIONS_SUCCESS,
  UPDATE_INVITATION,
  ARCHIVE_PROJECT,
  UNARCHIVE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT
} from './constants';
import {LOGOUT} from "../Login/constants";
import {LEAVE_PROJECT} from "../Project/constants";

export const initialState = {
  todo: {loading: false, data: []},
  notes: {loading: false, data: []},
  invitations: {loading: false, data: []},
  projects: {loading: false, data: [], creating: false},
};

export default function (state = initialState, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_PROJECTS:
        draft.projects.loading = true;
        break;
      case GET_PROJECTS_SUCCESS:
        draft.projects.data = action.payload;
        draft.projects.loading = false;
        break;
      case CREATE_PROJECT:
        draft.projects.creating = true;
        break;
      case CREATE_PROJECT_SUCCESS:
        draft.projects.data.push(action.payload);
        draft.projects.creating = false;
        break;
      case GET_INVITATIONS:
        draft.invitations.loading = true;
        break;
      case GET_INVITATIONS_SUCCESS:
        draft.invitations.data = action.payload;
        draft.invitations.loading = false;
        break;
      case UPDATE_INVITATION:
        draft.invitations.data = state.invitations.data.filter(i => i._id !== action.data);
        break;
      case ARCHIVE_PROJECT:
        draft.projects.data = state.projects.data.map(p => p._id === action.data ? {...p, archived: true} : p);
        break;
      case UNARCHIVE_PROJECT:
        draft.projects.data = state.projects.data.map(p => p._id === action.data ? {...p, archived: false} : p);
        break;
      case DELETE_PROJECT:
      case LEAVE_PROJECT:
        draft.projects.data = state.projects.data.filter(p => p._id !== action.data);
        break;
      case LOGOUT:
        return initialState;

      default:
        return state;
    }
  });
}
