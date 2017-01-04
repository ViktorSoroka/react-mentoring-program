import dispather from '../dispatcher';
import TodoActionTypes from '../constants/TodoActionTypes';
import uuidV4 from 'uuid/v4';


import { createStore } from '../utils/StoreUtils';


const {
        START_FETCH_TODOS,
        FETCH_TODOS_SUCCEED,
        SET_ACTIVE_CATEGORY,
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_TASK
      } = TodoActionTypes;

let _todos             = [];
let _activeCategory    = {};
let _isFetchTodosError = false;

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


function createCategory(title, parentId) {
  return {
    id           : uuidV4(),
    title,
    parentId
  };
}

function createTask(title) {
  return {
    id           : uuidV4(),
    title,
    isCompleted: false
  };
}


dispather.register(({ actionType, data }) => {
  switch (actionType) {
    case SET_ACTIVE_CATEGORY: {
      _activeCategory = data;
      TodoStore.emitChange();
      break;
    }
    case START_FETCH_TODOS: {
      _isFetchTodosError = false;
      TodoStore.emitChange();
      break;
    }
    case FETCH_TODOS_SUCCEED: {
      _todos             = data;
      _isFetchTodosError = false;
      TodoStore.emitChange();
      break;
    }
    case ADD_CATEGORY: {
      const newCategory = createCategory(data.title, data.parentId);
      _todos.unshift(newCategory);
      _activeCategory = newCategory;
      TodoStore.emitChange();
      break;
    }
    case EDIT_CATEGORY: {
      TodoStore.emitChange();
      break;
    }
    case DELETE_CATEGORY: {
      TodoStore.emitChange();
      break;
    }
    case ADD_TASK: {
      const targetCategory = data.targetCategory || _activeCategory;

      if (!targetCategory.subtasks) {
        targetCategory.subtasks = [];
      }

      targetCategory.subtasks.unshift(createTask(data.title));
      TodoStore.emitChange();
      break;
    }
  }

  return true;
});

export default TodoStore;
