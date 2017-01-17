import TodoActionTypes from '../constants/TodoActionTypes';
import { v4 } from 'node-uuid';


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


export const addCategory = (title) => ({
  type   : ADD_CATEGORY,
  payload: {
    title,
    id: v4()
  }
});

export const addNestedCategory = (parentId, title) => ({
  type   : ADD_NESTED_CATEGORY,
  payload: {
    id: v4(),
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

export const deleteCategory = ({ categoryId, categoriesToDelete, tasksToDelete }) => ({
  type   : DELETE_CATEGORY,
  payload: {
    categoryId,
    categoriesToDelete,
    tasksToDelete,
  }
});

export const addTask = (title, payload) => ({
  type   : ADD_TASK,
  payload: {
    id              : v4(),
    title,
    targetCategoryId: payload.targetCategoryId
  }
});

export const updateTask = ({ taskId, title, isCompleted, description }) => ({
  type   : UPDATE_TASK,
  payload: {
    taskId,
    title,
    isCompleted,
    description
  }
});

export const changeTaskParent = ({ currentCategoryId, targetCategoryId, taskId }) => ({
  type   : CHANGE_SUBTASK_PARENT,
  payload: {
    currentCategoryId,
    targetCategoryId,
    taskId
  }
});

export const updateTaskCompletion = ({ taskId, isCompleted }) => ({
  type   : UPDATE_TASK_COMPLETION,
  payload: {
    taskId,
    isCompleted
  }
});
