import React, { Component } from 'react';

import CategoryTree from '../CategoryTree/CategoryTree';

import './CategoryTrees.css';


export default class CategoryTrees extends Component {
  render() {
    const { categories = [], activeCategoryId, activeSubtask } = this.props;

    return (
      <div className="todo-category-trees">
        {categories.map(category => {
          return <CategoryTree key={category.id}
                               category={category}
                               parentCategory={null}
                               activeCategoryId={activeCategoryId}
                               activeSubtask={activeSubtask}/>
        })}
      </div>
    );
  }
}
