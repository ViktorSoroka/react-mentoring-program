import React from 'react';
import PropTypes from 'prop-types';

import CategoryTree from '../CategoryTree/CategoryTree';
import { deleteCategory } from '../../actions/TodoActions';


import './CategoryTrees.css';


const getTopLevelCategories = categories => {
  return Object.keys(categories).reduce((res, key) => {
    const category = categories[key];

    if (category.parentId === null) {
      res.push(category);
    }

    return res;
  }, []);
};

export default function CategoryTrees({ categories, activeCategoryId, activeTask, getCategory }) {
  return (
    <div className="todo-category-trees">
      {getTopLevelCategories(categories).map(category => {
        return (
          <CategoryTree
            key={category.id}
            category={category}
            parentCategory={null}
            getCategory={getCategory}
            activeTask={activeTask}
            activeCategoryId={activeCategoryId}
            deleteCategory={(id) => deleteCategory(id)}
          />
        );
      })}
    </div>
  );
}

CategoryTrees.propTypes = {
  getCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  activeCategoryId: PropTypes.string,
  activeTask: PropTypes.object
};
