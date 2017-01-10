import Dispatcher from '../dispatcher';
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


export function addCategory(title, parentId = null) {
  Dispatcher.dispatch({
    actionType: ADD_CATEGORY,
    data      : {
      title,
      parentId
    }
  });
}

export function addNestedCategory(parentId, title) {
  Dispatcher.dispatch({
    actionType: ADD_NESTED_CATEGORY,
    data      : {
      title,
      parentId
    }
  });
}

export function editCategory(categoryId, title) {
  Dispatcher.dispatch({
    actionType: EDIT_CATEGORY,
    data      : {
      title,
      categoryId
    }
  });
}

export function deleteCategory(categoryId) {
  Dispatcher.dispatch({
    actionType: DELETE_CATEGORY,
    data      : {
      categoryId
    }
  });
}

export function addTask(title, payload) {
  Dispatcher.dispatch({
    actionType: ADD_TASK,
    data      : {
      title,
      targetCategoryId: payload.targetCategoryId
    }
  });
}

export function updateTask({ subtaskId, title, isCompleted, description }) {
  Dispatcher.dispatch({
    actionType: UPDATE_TASK,
    data      : {
      subtaskId,
      title,
      isCompleted,
      description
    }
  });
}

export function changeSubtaskParent({ currentCategoryId, targetCategoryId, subtaskId }) {
  Dispatcher.dispatch({
    actionType: CHANGE_SUBTASK_PARENT,
    data      : {
      currentCategoryId,
      targetCategoryId,
      subtaskId
    }
  });
}

export function updateTaskCompletion({ subtaskId, isCompleted }) {
  Dispatcher.dispatch({
    actionType: UPDATE_TASK_COMPLETION,
    data      : {
      subtaskId,
      isCompleted,
    }
  });
}
