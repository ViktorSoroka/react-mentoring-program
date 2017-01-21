import TodoActionTypes from '../constants/TodoActionTypes';


const {
        ADD_CATEGORY,
        UPDATE_CATEGORY,
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

const category = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY: {
      const { id, title, parentId } = payload;

      return createCategory({ id, title, parentId });
    }
    case UPDATE_CATEGORY: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};

export default category;
