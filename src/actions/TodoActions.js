import TodoActionTypes from '../constants/TodoActionTypes';


const {
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_NESTED_CATEGORY,
        ADD_TASK,
        UPDATE_TASK,
        UPDATE_TASK_COMPLETION,
        CHANGE_SUBTASK_PARENT
      } = TodoActionTypes;


export const addCategory = title => ({
  type   : ADD_CATEGORY,
  payload: {
    title
  }
});

export const addNestedCategory = (parentId, title) => ({
  type   : ADD_NESTED_CATEGORY,
  payload: {
    title,
    parentId
  }
});

export const editCategory = (categoryId, title) => ({
  type   : EDIT_CATEGORY,
  payload: {
    title,
    categoryId
  }
});

export const deleteCategory = (categoryId) => ({
  type   : DELETE_CATEGORY,
  payload: {
    categoryId
  }
});

export const addTask = (title, payload) => ({
  type   : ADD_TASK,
  payload: {
    title,
    targetCategoryId: payload.targetCategoryId
  }
});

export const updateTask = ({ subtaskId, title, isCompleted, description }) => ({
  type   : UPDATE_TASK,
  payload: {
    subtaskId,
    title,
    isCompleted,
    description
  }
});

export const changeSubtaskParent = ({ currentCategoryId, targetCategoryId, subtaskId }) => ({
  type   : CHANGE_SUBTASK_PARENT,
  payload: {
    currentCategoryId,
    targetCategoryId,
    subtaskId
  }
});

export const updateTaskCompletion = ({ subtaskId, isCompleted }) => ({
  type: UPDATE_TASK_COMPLETION,
  payload: {
    subtaskId,
    isCompleted
  }
});
