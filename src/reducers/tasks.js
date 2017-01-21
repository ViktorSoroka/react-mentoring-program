import TodoActionTypes from '../constants/TodoActionTypes';
import task            from './task';
import undoable        from 'redux-undo';


const {
        ADD_TASK,
        UPDATE_TASK,
        UPDATE_TASK_COMPLETION,
        CHANGE_SUBTASK_PARENT,
        DELETE_CATEGORY
      } = TodoActionTypes;


const tasks = (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK:
    case UPDATE_TASK:
    case UPDATE_TASK_COMPLETION: {
      const { payload: { id } } = action;

      return {
        ...state,
        [id]: task(state[id], action)
      };
    }
    case CHANGE_SUBTASK_PARENT: {
      const { payload: { id, targetCategoryId } } = action;

      return {
        ...state,
        [id]: task(state[id], {
          type: UPDATE_TASK,
          payload: {
            categoryId: targetCategoryId
          }
        })
      };
    }
    case DELETE_CATEGORY: {
      const newState = {};

      Object.keys(state).forEach(key => {
        if (!action.payload.tasksToDelete.includes(key)) {
          newState[key] = state[key];
        }
      });

      return newState;
    }
    default:
      return state;
  }
};

export default undoable(tasks);
