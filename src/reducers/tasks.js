import TodoActionTypes from '../constants/TodoActionTypes';


const {
        DELETE_CATEGORY,
        ADD_TASK,
        UPDATE_TASK,
        UPDATE_TASK_COMPLETION,
        CHANGE_SUBTASK_PARENT
      } = TodoActionTypes;

function createTask({ id, title, categoryId }) {
  return {
    id,
    title,
    categoryId,
    description: '',
    isCompleted: false
  };
}

export default function (state = {}, { type, payload }) {
  switch (type) {
    case ADD_TASK: {
      const newTask = createTask({
        id        : payload.id,
        title     : payload.title,
        categoryId: payload.targetCategoryId,
      });

      return {
        ...state,
        [newTask.id]: newTask
      };
    }

    case UPDATE_TASK: {
      const { title, description, isCompleted, taskId } = payload;

      const task = state[taskId];

      return {
        ...state,
        [taskId]: {
          ...task,
          title,
          description,
          isCompleted
        }
      };
    }

    case UPDATE_TASK_COMPLETION: {
      const { isCompleted, taskId } = payload;

      const task = state[taskId];

      return {
        ...state,
        [taskId]: {
          ...task,
          isCompleted
        }
      }
    }

    case CHANGE_SUBTASK_PARENT: {
      const { targetCategoryId, taskId } = payload;

      const task = state[taskId];

      return {
        ...state,
        [taskId]: {
          ...task,
          categoryId: targetCategoryId
        }
      }
    }

    case DELETE_CATEGORY: {
      const newState = {};

      Object.keys(state).forEach(key => {
        if (!payload.tasksToDelete.includes(key)) {
          newState[key] = state[key];
        }
      });

      return newState;
    }
    default:
      return state;
  }
};
