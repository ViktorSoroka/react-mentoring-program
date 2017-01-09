import dispather       from '../dispatcher';
import TodoActionTypes from '../constants/TodoActionTypes';
import uuidV4          from 'uuid/v4';

import { createStore } from '../utils/StoreUtils';


const {
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_NESTED_CATEGORY,
        ADD_TASK,
        UPDATE_TASK,
        UPDATE_TASK_COMPLETION
      } = TodoActionTypes;


const _categories = {};

let _todos = [];
let _tasks = {};


const TodoStore = createStore({
  getTodoState() {
    return {
      todos   : _todos,
      subtasks: _tasks
    }
  },
  getActiveCategory(categoryId) {
    return _categories[categoryId];
  },
  getActiveTask(taskId) {
    return _tasks[taskId];
  }
});


function createCategory(title, parentId) {
  return {
    id           : uuidV4(),
    title,
    parentId,
    subtasks     : [],
    subcategories: []
  };
}

function createTask(title, categoryId) {
  return {
    id         : uuidV4(),
    title,
    categoryId,
    description: '',
    isCompleted: false
  };
}


dispather.register(({ actionType, data }) => {
  switch (actionType) { // eslint-disable-line default-case
    case ADD_CATEGORY: {
      const newCategory = createCategory(data.title, data.parentId);

      if (!data.title) return;

      _categories[newCategory.id] = newCategory;
      _todos.unshift(newCategory);
      break;
    }

    case ADD_NESTED_CATEGORY: {
      const newCategory = createCategory(data.title, data.parentCategory.id);

      _categories[newCategory.id] = newCategory;
      data.parentCategory.subcategories.unshift(newCategory);
      break;
    }

    case EDIT_CATEGORY: {
      data.category.title = data.title;
      break;
    }

    case DELETE_CATEGORY: {
      const holder = data.parentCategory && data.parentCategory.subcategories ? data.parentCategory.subcategories : _todos;

      _categories[data.category.id].subtasks.forEach(taskId => {
        delete _tasks[taskId];
      });
      delete _categories[data.category.id];

      holder.splice(holder.indexOf(data.category), 1);
      break;
    }

    case ADD_TASK: {
      if (!data.targetCategoryId || !_categories[data.targetCategoryId] || !data.title) return;

      const targetCategory = _categories[data.targetCategoryId];

      const newTask = createTask(data.title, targetCategory.id);

      _tasks[newTask.id] = newTask;
      targetCategory.subtasks.unshift(newTask.id);
      break;
    }

    case UPDATE_TASK: {
      const { title, description, isCompleted, subtaskId } = data;

      const subtask = _tasks[subtaskId];

      _tasks[subtaskId] = {
        ...subtask,
        title,
        description,
        isCompleted
      };
      break;
    }

    case UPDATE_TASK_COMPLETION: {
      const { isCompleted, subtaskId } = data;

      const subtask = _tasks[subtaskId];

      _tasks[subtaskId] = {
        ...subtask,
        isCompleted
      };
      break;
    }
  }

  TodoStore.emitChange();

  return true;
});

export default TodoStore;
