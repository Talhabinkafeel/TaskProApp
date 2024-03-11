import {
  ACCEPT_INVITATION,
  ARCHIVE_PROJECT,
  CREATE_NOTIFICATION,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  DECLINE_INVITATION,
  DELETE_PROJECT,
  GET_INVITATIONS,
  GET_INVITATIONS_SUCCESS,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  SET_NOTIFICATIONS_SEEN,
  UNARCHIVE_PROJECT,
  UPDATE_INVITATION,
} from "./constants";

export const getProjects = () => ({type: GET_PROJECTS});
export const getProjectsSuccess = payload => ({type: GET_PROJECTS_SUCCESS, payload});

export const getInvitations = () => ({type: GET_INVITATIONS});
export const getInvitationsSuccess = payload => ({type: GET_INVITATIONS_SUCCESS, payload});
export const updateInvitation = data => ({type: UPDATE_INVITATION, data});

export const acceptInvitation = data => ({type: ACCEPT_INVITATION, data});
export const declineInvitation = data => ({type: DECLINE_INVITATION, data});

export const createProject = data => ({type: CREATE_PROJECT, data});
export const createProjectSuccess = payload => ({type: CREATE_PROJECT_SUCCESS, payload});

export const archiveProject = data => ({type: ARCHIVE_PROJECT, data});
export const unarchiveProject = data => ({type: UNARCHIVE_PROJECT, data});
export const deleteProject = data => ({type: DELETE_PROJECT, data});

export const setNotificationsSeen = data => ({type: SET_NOTIFICATIONS_SEEN, data});

export const createNotification = data => ({type: CREATE_NOTIFICATION, data});
