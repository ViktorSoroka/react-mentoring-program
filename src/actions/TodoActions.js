import TodoActionTypes from '../constants/TodoActionTypes';
import { v4 } from 'node-uuid';


const {
        ADD_CATEGORY,
        UPDATE_CATEGORY,
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

export const updateCategory = (id, title) => ({
  type   : UPDATE_CATEGORY,
  payload: {
    title,
    id
  }
});

export const deleteCategory = ({ id, categoriesToDelete, tasksToDelete }) => ({
  type   : DELETE_CATEGORY,
  payload: {
    id,
    categoriesToDelete,
    tasksToDelete,
  }
});

export const addTask = (title, payload) => ({
  type   : ADD_TASK,
  payload: {
    id              : v4(),
    title,
    categoryId: payload.targetCategoryId
  }
});

export const updateTask = ({ id, title, isCompleted, description }) => ({
  type   : UPDATE_TASK,
  payload: {
    id,
    title,
    isCompleted,
    description
  }
});

export const changeTaskParent = ({ currentCategoryId, targetCategoryId, id }) => ({
  type   : CHANGE_SUBTASK_PARENT,
  payload: {
    currentCategoryId,
    targetCategoryId,
    id
  }
});

export const updateTaskCompletion = ({ id, isCompleted }) => ({
  type   : UPDATE_TASK_COMPLETION,
  payload: {
    id,
    isCompleted
  }
});
