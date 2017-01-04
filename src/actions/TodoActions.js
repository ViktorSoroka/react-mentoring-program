import Dispatcher from '../dispatcher';
import { getDbOnce } from '../utils/StorageUtils';
import TodoActionTypes from '../constants/TodoActionTypes';

const {
        START_FETCH_TODOS,
        FETCH_TODOS_SUCCEED,
        SET_ACTIVE_CATEGORY,
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_TASK
      } = TodoActionTypes;


export function setActiveCategory(id) {
  Dispatcher.dispatch({
    actionType: SET_ACTIVE_CATEGORY,
    data      : id
  });
}

export function startFetchingTodos() {
  Dispatcher.dispatch({
    actionType: START_FETCH_TODOS
  });
}

export function updateTodosState(data) {
  Dispatcher.dispatch({
    actionType: FETCH_TODOS_SUCCEED,
    data
  });
}

export function addCategory(title, parentId = null) {
  Dispatcher.dispatch({
    actionType: ADD_CATEGORY,
    data      : {
      title,
      parentId
    }
  });
}

export function editCategory(id) {
  Dispatcher.dispatch({
    actionType: EDIT_CATEGORY,
    data      : id
  });
}

export function deleteCategory(id) {
  Dispatcher.dispatch({
    actionType: DELETE_CATEGORY,
    data      : id
  });
}

export function addTask(title, targetCategory = null) {
  Dispatcher.dispatch({
    actionType: ADD_TASK,
    data      : {
      title,
      targetCategory
    }
  });
}

export function fetchTodos() {
  startFetchingTodos();

  getDbOnce(data => {
    updateTodosState(data);
  });
}
