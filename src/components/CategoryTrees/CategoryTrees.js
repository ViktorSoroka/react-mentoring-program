import React, { PropTypes } from 'react';

import CategoryTree from '../CategoryTree/CategoryTree';

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

export default function CategoryTrees({ categories, activeCategoryId, activeSubtask, getCategory }) {
  return (
    <div className="todo-category-trees">
      {getTopLevelCategories(categories).map(category => {
        return <CategoryTree key={category.id}
                             category={category}
                             parentCategory={null}
                             getCategory={getCategory}
                             activeSubtask={activeSubtask}
                             activeCategoryId={activeCategoryId}/>
      })}
    </div>
  );
}

CategoryTrees.propTypes = {
  getCategory     : PropTypes.func.isRequired,
  categories      : PropTypes.object.isRequired,
  activeCategoryId: PropTypes.string,
  activeSubtask   : PropTypes.object
};
