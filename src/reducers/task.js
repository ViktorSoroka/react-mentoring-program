import TodoActionTypes from '../constants/TodoActionTypes';


const {
  ADD_TASK,
  UPDATE_TASK,
  UPDATE_TASK_COMPLETION,
  CHANGE_SUBTASK_PARENT,
} = TodoActionTypes;

function createTask({ id, title, categoryId, description = '', isCompleted = false }) {
  return {
    id,
    title,
    categoryId,
    description,
    isCompleted
  };
}

const task = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TASK: {
      const { id, title, categoryId } = payload;

      return createTask({ id, title, categoryId });
    }
    case UPDATE_TASK:
    case UPDATE_TASK_COMPLETION:
    case CHANGE_SUBTASK_PARENT: {
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};

export default task;
