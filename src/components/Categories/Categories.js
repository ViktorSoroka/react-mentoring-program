import React, { Component } from 'react';

import Search   from '../Search/Search';
import Category from '../Category/Category';

import './Categories.css';


export default class Categories extends Component {
  render() {
    const { categories, activeCategoryId } = this.props;

    return (
      <div className="todo-categories">
        <Search />
        <div>
          {categories.map(category => {
            return <Category key={category.id}
                             category={category}
                             isActive={activeCategoryId === category.id}/>
          })}
        </div>
      </div>
    );
  }
}
