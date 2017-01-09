import Dispatcher from '../dispatcher';
import TodoActionTypes from '../constants/TodoActionTypes';


const {
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_NESTED_CATEGORY,
        ADD_TASK,
        UPDATE_TASK,
        UPDATE_TASK_COMPLETION
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

export function addNestedCategory(parentCategory, title) {
  Dispatcher.dispatch({
    actionType: ADD_NESTED_CATEGORY,
    data      : {
      title,
      parentCategory
    }
  });
}

export function editCategory(category, title) {
  Dispatcher.dispatch({
    actionType: EDIT_CATEGORY,
    data      : {
      title,
      category
    }
  });
}

export function deleteCategory(category, parentCategory) {
  Dispatcher.dispatch({
    actionType: DELETE_CATEGORY,
    data      : {
      category,
      parentCategory
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

export function updateTaskCompletion({ subtaskId, isCompleted }) {
  Dispatcher.dispatch({
    actionType: UPDATE_TASK_COMPLETION,
    data      : {
      subtaskId,
      isCompleted,
    }
  });
}
