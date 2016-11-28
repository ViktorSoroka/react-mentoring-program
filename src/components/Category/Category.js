import React, { Component } from 'react';

import './Category.css';


export default class Category extends Component {
  render() {
    const { category } = this.props;

    return (
      <div className="todo-category">
        <div>
          <strong className="todo-category__title">{category.title}</strong>
          <button className="toto-category__btn-edit icon-edit"></button>
        </div>
        <div>
          <button className="toto-category__btn-remove icon-trash-empty"></button>
          <button className="toto-category__btn-add icon-plus-squared-alt"></button>
        </div>
      </div>
    );
  }
}
