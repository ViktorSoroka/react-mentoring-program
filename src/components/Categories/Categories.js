import React, { Component } from 'react';

import Search   from '../Search/Search';
import Category from '../Category/Category';

import './Categories.css';


export default class Categories extends Component {
  render() {
    const { categories, activeCategory } = this.props;

    return (
      <div className="todo-categories">
        <Search />
        <div className="todo-categories__categories">
          {categories.map(category => {
            return <Category key={category.id}
                             category={category}
                             activeCategoryId={activeCategory.id}/>
          })}
        </div>
      </div>
    );
  }
}
