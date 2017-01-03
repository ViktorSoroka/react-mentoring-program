import React, { Component } from 'react';

import Category from '../Category/Category';

import './Categories.css';


export default class Categories extends Component {
  render() {
    const { categories, activeCategory } = this.props;

    return (
      <div className="todo-categories">
        {categories.map(category => {
          return <Category key={category.id}
                           category={category}
                           activeCategoryId={activeCategory.id}/>
        })}
      </div>
    );
  }
}
