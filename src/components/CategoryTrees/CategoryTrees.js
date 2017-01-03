import React, { Component } from 'react';

import CategoryTree from '../CategoryTree/CategoryTree';

import { setActiveCategory } from '../../actions/TodoActions';

import './CategoryTrees.css';


export default class CategoryTrees extends Component {
  render() {
    const { categories, activeCategory } = this.props;

    return (
      <div className="todo-category-trees">
        {categories.map(category => {
          return <CategoryTree key={category.id}
                                            category={category}
                                            activeCategoryId={activeCategory.id}
                                            setActiveCategory={setActiveCategory}/>
        })}
      </div>
    );
  }
}
