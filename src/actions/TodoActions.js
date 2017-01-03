import Dispatcher from '../dispatcher';
import TodoActionTypes from '../constants/TodoActionTypes';
import { getDbOnce } from '../utils/StorageUtils';

export function setActiveCategory(id) {
  Dispatcher.dispatch({
    actionType: TodoActionTypes.ACTIVE_CATEGORY_SET,
    data: id
  });
}

export function startFetchingTodos() {
  Dispatcher.dispatch({
    actionType: TodoActionTypes.FETCH_TODOS_STARTED
  });
}

export function updateTodosState(data) {
  Dispatcher.dispatch({
    actionType: TodoActionTypes.FETCH_TODOS_SUCCEED,
    data
  });
}

export function fetchTodos() {
  startFetchingTodos();

  getDbOnce(data => {
    updateTodosState(data);
  });
}
