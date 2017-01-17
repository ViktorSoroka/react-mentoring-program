import { v4 }          from 'node-uuid';
import TodoActionTypes from '../constants/TodoActionTypes';


const {
        ADD_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        ADD_NESTED_CATEGORY,
        ADD_TASK,
        CHANGE_SUBTASK_PARENT
      } = TodoActionTypes;


function createCategory({ id, title, parentId = null }) {
  return {
    id,
    title,
    parentId,
    tasks        : [],
    subcategories: []
  };
}

export default function (state = {}, { type, payload }) {
  switch (type) {
    case ADD_CATEGORY: {
      const newCategory = createCategory({
        id      : payload.id,
        title   : payload.title,
        parentId: null
      });

      return {
        ...state,
        [newCategory.id]: newCategory
      };
    }

    case ADD_NESTED_CATEGORY: {
      const parentCategory = state[payload.parentId];
      const newCategory    = createCategory({
        id      : payload.id,
        title   : payload.title,
        parentId: payload.parentId
      });

      return {
        ...state,
        [newCategory.id]  : newCategory,
        [payload.parentId]: {
          ...parentCategory,
          subcategories: [newCategory.id, ...parentCategory.subcategories]
        }
      };
    }

    case EDIT_CATEGORY: {
      const category = state[payload.categoryId];

      return {
        ...state,
        [payload.categoryId]: {
          ...category,
          title: payload.title
        }
      };
    }

    case DELETE_CATEGORY: {
      const newState = {};
      const { categoryId, categoriesToDelete } = payload;

      const category = state[categoryId];
      const parentCategory = state[category.parentId];

      Object.keys(state).forEach(key => {
        if (!categoriesToDelete.includes(key)) {
          newState[key] = state[key];
        }
      });

      if (parentCategory) {
        newState[parentCategory.id] = {
          ...parentCategory,
          subcategories: parentCategory.subcategories
            .filter(id => categoryId !== id)
        }
      }

      return newState;
    }

    case ADD_TASK: {
      const targetCategory = state[payload.targetCategoryId];

      return {
        ...state,
        [targetCategory.id]: {
          ...targetCategory,
          tasks: [payload.id, ...targetCategory.tasks]
        }
      };
    }

    case CHANGE_SUBTASK_PARENT: {
      const { currentCategoryId, targetCategoryId, taskId } = payload;

      const currentCategory = state[currentCategoryId];
      const targetCategory  = state[targetCategoryId];

      return {
        ...state,
        [targetCategoryId] : {
          ...targetCategory,
          tasks: [taskId, ...targetCategory.tasks]
        },
        [currentCategoryId]: {
          ...currentCategory,
          tasks: currentCategory.tasks.filter(item => item !== taskId)
        }
      }
    }

    default:
      return state;
  }
};
