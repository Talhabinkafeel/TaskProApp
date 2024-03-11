import {
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_TASKS_SUCCESS,
  NEW_TASK,
  NEW_TASK_SUCCESS,
  UPDATE_PROJECT_CALENDAR,
  UPDATE_PROJECT_CALENDAR_SUCCESS,
  UPDATE_TASK,
  GET_TASK,
  GET_TASK_SUCCESS,
  DELETE_TASK,
  UPDATE_PROJECT_LOGO,
  UPDATE_PROJECT_LOGO_SUCCESS,
  UPDATE_PROJECT,
  MUTE_PROJECT,
  MUTE_PROJECT_SUCCESS,
  LEAVE_PROJECT,
  CREATE_TODO_GROUP,
  CREATE_TODO_GROUP_SUCCESS,
  CREATE_TASK_TODO,
  CREATE_TASK_TODO_SUCCESS,
  CREATE_TASK_ATTACHMENT_SUCCESS,
  CREATE_TASK_ATTACHMENT,
  DELETE_TODO_GROUP,
  DELETE_TASK_TODO,
  DELETE_TASK_ATTACHMENT,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ATTACHMENT,
  CREATE_COMMENT_ATTACHMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_ATTACHMENT,
  UPDATE_COMMENT,
  UPDATE_TODO_GROUP,
  UPDATE_TASK_TODO, UPDATE_TASK_LIST
} from "./constants";

export const getProject = data => ({type: GET_PROJECT, data});
export const getProjectSuccess = payload => ({type: GET_PROJECT_SUCCESS, payload});

export const getProjectTasksSuccess = payload => ({type: GET_PROJECT_TASKS_SUCCESS, payload});

export const updateProjectCalendar = data => ({type: UPDATE_PROJECT_CALENDAR, data});
export const updateProjectCalendarSuccess = payload => ({type: UPDATE_PROJECT_CALENDAR_SUCCESS, payload});

export const updateTask = data => ({type: UPDATE_TASK, data});

export const newTask = data => ({type: NEW_TASK, data});
export const newTaskSuccess = payload => ({type: NEW_TASK_SUCCESS, payload});

export const updateProjectLogo = data => ({type: UPDATE_PROJECT_LOGO, data});
export const updateProjectLogoSuccess = payload => ({type: UPDATE_PROJECT_LOGO_SUCCESS, payload});

export const updateProject = data => ({type: UPDATE_PROJECT, data});

export const leaveProject = data => ({type: LEAVE_PROJECT, data});

export const updateTaskList = data => ({type: UPDATE_TASK_LIST, data});

export const muteProject = data => ({type: MUTE_PROJECT, data});
export const muteProjectSuccess = payload => ({type: MUTE_PROJECT_SUCCESS, payload});

export const deleteTask = data => ({type: DELETE_TASK, data});

export const getTask = data => ({type: GET_TASK, data});
export const getTaskSuccess = payload => ({type: GET_TASK_SUCCESS, payload});

export const createTodoGroup = data => ({type: CREATE_TODO_GROUP, data});
export const createTodoGroupSuccess = payload => ({type: CREATE_TODO_GROUP_SUCCESS, payload});
export const updateTodoGroup = data => ({type: UPDATE_TODO_GROUP, data});

export const createTaskTodo = data => ({type: CREATE_TASK_TODO, data});
export const createTaskTodoSuccess = payload => ({type: CREATE_TASK_TODO_SUCCESS, payload});
export const updateTaskTodo = data => ({type: UPDATE_TASK_TODO, data});

export const createTaskAttachment = data => ({type: CREATE_TASK_ATTACHMENT, data});
export const createTaskAttachmentSuccess = payload => ({type: CREATE_TASK_ATTACHMENT_SUCCESS, payload});

export const deleteTodoGroup = data => ({type: DELETE_TODO_GROUP, data});

export const deleteTaskTodo = data => ({type: DELETE_TASK_TODO, data});
export const deleteTaskAttachment = data => ({type: DELETE_TASK_ATTACHMENT, data});

export const createComment = data => ({type: CREATE_COMMENT, data});
export const createCommentSuccess = payload => ({type: CREATE_COMMENT_SUCCESS, payload});

export const createCommentAttachment = data => ({type: CREATE_COMMENT_ATTACHMENT, data});
export const createCommentAttachmentSuccess = payload => ({type: CREATE_COMMENT_ATTACHMENT_SUCCESS, payload});

export const updateComment = data => ({type: UPDATE_COMMENT, data});
export const deleteCommentAttachment = data => ({type: DELETE_COMMENT_ATTACHMENT, data});
export const deleteComment = data => ({type: DELETE_COMMENT, data});
