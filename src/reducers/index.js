import uuidV4          from 'uuid/v4';
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


function createCategory(title, parentId = null) {
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

function deleteCategory(categoryId, state) {
  const { categories, subtasks } = state;

  const category = categories[categoryId];

  if (category.subcategories.length) {
    category.subcategories.forEach(subcategory => deleteCategory(subcategory, state));
  }

  category.subtasks.forEach(taskId => {
    delete subtasks[taskId];
  });

  if (categories[category.parentId]) {
    const parentSubCategoriesList = categories[category.parentId].subcategories;

    parentSubCategoriesList.splice(parentSubCategoriesList.indexOf(categories[category.parentId]), 1);
  }

  delete categories[categoryId];
}

export default function appReducer(state = { categories: {}, subtasks: {} }, { type, payload }) {
  switch (type) {
    case ADD_CATEGORY: {
      //todo handle checking in UI
      if (!payload.title) return state;

      const newCategory = createCategory(payload.title, null);

      return {
        subtasks  : { ...state.subtasks },
        categories: {
          ...state.categories,
          [newCategory.id]: newCategory
        }
      };
    }

    case ADD_NESTED_CATEGORY: {
      const { categories, subtasks } = state;

      const parentCategory = categories[payload.parentId];
      const newCategory    = createCategory(payload.title, payload.parentId);

      return {
        subtasks  : { ...subtasks },
        categories: {
          ...categories,
          [newCategory.id]  : newCategory,
          [payload.parentId]: {
            ...parentCategory,
            subcategories: [newCategory.id, ...parentCategory.subcategories]
          }
        }
      };
    }

    case EDIT_CATEGORY: {
      const { categories } = state;

      const category = categories[payload.categoryId];

      return {
        tasks     : { ...state.tasks },
        categories: {
          ...categories,
          [payload.categoryId]: {
            ...category,
            title: payload.title
          }
        }
      };
    }

    case DELETE_CATEGORY: {
      const clonedState = {
        categories: { ...state.categories },
        subtasks  : { ...state.subtasks }
      };

      deleteCategory(payload.categoryId, clonedState);

      return clonedState;
    }

    case ADD_TASK: {
      const { subtasks, categories } = state;

      //todo handle checking in UI
      if (!payload.targetCategoryId || !categories[payload.targetCategoryId] || !payload.title) return state;

      const targetCategory = categories[payload.targetCategoryId];
      const newTask        = createTask(payload.title, targetCategory.id);

      return {
        categories: {
          ...categories,
          [targetCategory.id]: {
            ...targetCategory,
            subtasks: [newTask.id, ...targetCategory.subtasks]
          }
        },
        subtasks  : {
          ...subtasks,
          [newTask.id]: newTask
        }
      };
    }

    case UPDATE_TASK: {
      const { categories, subtasks }                       = state;
      const { title, description, isCompleted, subtaskId } = payload;

      const task = subtasks[subtaskId];

      return {
        categories: { ...categories },
        subtasks  : {
          ...subtasks,
          [subtaskId]: {
            ...task,
            title,
            description,
            isCompleted
          }
        }
      };
    }

    case UPDATE_TASK_COMPLETION: {
      debugger;
      const { categories, subtasks }   = state;
      const { isCompleted, subtaskId } = payload;

      const task = subtasks[subtaskId];

      return {
        categories: { ...categories },
        subtasks  : {
          ...subtasks,
          [subtaskId]: {
            ...task,
            isCompleted
          }
        }
      }
    }
    case CHANGE_SUBTASK_PARENT: {
      const { categories, subtasks } = state;

      const { currentCategoryId, targetCategoryId, subtaskId } = payload;

      const currentCategory = categories[currentCategoryId];
      const targetCategory  = categories[targetCategoryId];
      const task            = subtasks[subtaskId];

      return {
        categories: {
          ...categories,
          [targetCategoryId] : {
            ...targetCategory,
            subtasks: [subtaskId, ...targetCategory.subtasks]
          },
          [currentCategoryId]: {
            ...currentCategory,
            subtasks: currentCategory.subtasks.filter(item => item !== subtaskId)
          }
        },
        subtasks  : {
          ...subtasks,
          [subtaskId]: {
            ...task,
            categoryId: targetCategoryId
          }
        }
      }
    }

    default:
      return state;
  }
};
