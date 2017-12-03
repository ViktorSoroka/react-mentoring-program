import TodoActionTypes from '../constants/TodoActionTypes';
import category from './category';
import undoable from 'redux-undo';


const {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_NESTED_CATEGORY,
  ADD_TASK,
  CHANGE_SUBTASK_PARENT
} = TodoActionTypes;

const categories = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
    case UPDATE_CATEGORY: {
      const { payload } = action;

      return {
        ...state,
        [payload.id]: category(state[payload.id], action)
      };
    }

    case ADD_NESTED_CATEGORY: {
      const { payload } = action;

      const parentCategory = state[payload.parentId];

      return {
        ...state,
        [payload.id]: category(undefined, {
          type: ADD_CATEGORY,
          payload: action.payload
        }),
        [payload.parentId]: category(parentCategory, {
          type: UPDATE_CATEGORY,
          payload: {
            subcategories: [...parentCategory.subcategories, payload.id]
          }
        })
      };
    }

    case DELETE_CATEGORY: {
      const newState = {};

      const { id, categoriesToDelete } = action.payload;

      const currentCategory = state[id];
      const parentCategory = state[currentCategory.parentId];

      Object.keys(state).forEach(key => {
        if (!categoriesToDelete.includes(key)) {
          newState[key] = state[key];
        }
      });

      if (parentCategory) {
        newState[parentCategory.id] = category(parentCategory, {
          type: UPDATE_CATEGORY,
          payload: {
            subcategories: parentCategory.subcategories
              .filter(categoryId => categoryId !== id)
          }
        });
      }

      return newState;
    }

    case ADD_TASK: {
      const { payload } = action;

      const targetCategory = state[payload.categoryId];

      return {
        ...state,
        [targetCategory.id]: category(targetCategory, {
          type: UPDATE_CATEGORY,
          payload: {
            tasks: [payload.id, ...targetCategory.tasks]
          }
        })
      };
    }

    case CHANGE_SUBTASK_PARENT: {
      const { currentCategoryId, targetCategoryId, id } = action.payload;

      const currentCategory = state[currentCategoryId];
      const targetCategory = state[targetCategoryId];

      return {
        ...state,
        [targetCategoryId]: category(targetCategory, {
          type: UPDATE_CATEGORY,
          payload: {
            tasks: [id, ...targetCategory.tasks]
          }
        }),
        [currentCategoryId]: category(currentCategory, {
          type: UPDATE_CATEGORY,
          payload: {
            tasks: currentCategory.tasks.filter(taskId => taskId !== id)
          }
        })
      };
    }

    default:
      return state;
  }
};

export default undoable(categories);
