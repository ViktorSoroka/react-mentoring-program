import dispather from '../dispatcher';
import TodoActionTypes from '../constants/TodoActionTypes';

import { createStore } from '../utils/StoreUtils';

let _todos             = [];
let _isFetchTodosError = false;
let _activeCategory  = {};

const TodoStore = createStore({
  getTodos() {
    return _todos;
  },

  getTodoState() {
    return {
      activeCategory: _activeCategory,
      todos         : _todos
    }
  },

  getActiveCategoryId() {
    return _activeCategory;
  }
});


dispather.register(action => {
  switch (action.actionType) {
    case TodoActionTypes.ACTIVE_CATEGORY_SET: {
      _activeCategory = _todos[action.data];
      TodoStore.emitChange();
      break;
    }
    case TodoActionTypes.FETCH_TODOS_STARTED: {
      _isFetchTodosError = false;
      TodoStore.emitChange();
      break;
    }
    case TodoActionTypes.FETCH_TODOS_SUCCEED: {
      _todos             = action.data;
      _isFetchTodosError = false;
      TodoStore.emitChange();
      break;
    }
  }

  return true;
});

export default TodoStore;
