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
        UPDATE_TASK_COMPLETION,
        CHANGE_SUBTASK_PARENT
      } = TodoActionTypes;


let _categories = {};
let _tasks      = {};


const TodoStore = createStore({
  getTodoState() {
    return {
      subtasks  : _tasks,
      categories: _categories
    }
  },
  getCategory(categoryId) {
    return _categories[categoryId];
  },
  getActiveTask(taskId) {
    return _tasks[taskId];
  }
});


function createCategory(title, parentId) {
  return {
    id           : uuidV4(),
    dateAdded    : new Date().valueOf(),
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

function deleteCategory(categoryId) {
  debugger;
  const category = _categories[categoryId];

  if (category.subcategories.length) {
    category.subcategories.forEach(deleteCategory);
  }

  category.subtasks.forEach(taskId => {
    delete _tasks[taskId];
  });

  delete _categories[categoryId];
}


dispather.register(({ actionType, data }) => {
  switch (actionType) { // eslint-disable-line default-case
    case ADD_CATEGORY: {
      if (!data.title) return;

      const newCategory = createCategory(data.title, data.parentId);

      _categories = {
        ..._categories,
        [newCategory.id]: newCategory
      };

      break;
    }

    case EDIT_CATEGORY: {
      const category = _categories[data.categoryId];

      _categories = {
        ..._categories,
        [data.categoryId]: {
          ...category,
          title: data.title
        }
      };

      break;
    }

    case ADD_NESTED_CATEGORY: {
      const parentCategory = _categories[data.parentId];
      const newCategory    = createCategory(data.title, data.parentId);

      _categories[newCategory.id] = newCategory;
      _categories[data.parentId]  = {
        ...parentCategory,
        subcategories: [newCategory.id, ...parentCategory.subcategories]
      };

      break;
    }

    case DELETE_CATEGORY: {
      deleteCategory(data.categoryId);

      break;
    }

    case ADD_TASK: {
      if (!data.targetCategoryId || !_categories[data.targetCategoryId] || !data.title) return;

      const targetCategory = _categories[data.targetCategoryId];
      const newTask        = createTask(data.title, targetCategory.id);

      _tasks[newTask.id] = newTask;

      _categories[targetCategory.id] = {
        ...targetCategory,
        subtasks: [newTask.id, ...targetCategory.subtasks]
      };

      break;
    }

    case UPDATE_TASK: {
      const { title, description, isCompleted, subtaskId } = data;

      const task = _tasks[subtaskId];

      _tasks[subtaskId] = {
        ...task,
        title,
        description,
        isCompleted
      };

      break;
    }

    case UPDATE_TASK_COMPLETION: {
      const { isCompleted, subtaskId } = data;

      const task = _tasks[subtaskId];

      _tasks[subtaskId] = {
        ...task,
        isCompleted
      };

      break;
    }

    case CHANGE_SUBTASK_PARENT: {
      const currentCategory = _categories[data.currentCategoryId];
      const clonedSubtasks  = [...currentCategory.subtasks];
      const targetCategory  = _categories[data.targetCategoryId];
      const task            = _tasks[data.subtaskId];

      clonedSubtasks.splice(clonedSubtasks.indexOf(data.subtaskId), 1);

      _categories[data.currentCategoryId] = {
        ...currentCategory,
        subtasks: clonedSubtasks
      };

      _categories[data.targetCategoryId] = {
        ...targetCategory,
        subtasks: [data.subtaskId, ...targetCategory.subtasks]
      };

      _tasks[data.subtaskId] = {
        ...task,
        categoryId: data.targetCategoryId
      };

      break;
    }
  }

  TodoStore.emitChange();

  return true;
});

export default TodoStore;
