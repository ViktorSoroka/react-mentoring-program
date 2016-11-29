import React, { Component } from 'react';

import './Category.css';


export default class Category extends Component {
  static isCategoryActive(categoryId, activeCategoryId) {
    return categoryId === activeCategoryId;
  }

  renderCategory = (category, activeCategoryId) => {
    const isCategoryActive = Category.isCategoryActive(category.id, activeCategoryId);

    return (
      <div className="todo-category-wrap" key={category.id}>
        <div className={"todo-category" + (isCategoryActive ? " is-active" : "")}>
          <div>
            <strong className="todo-category__title">{category.title}</strong>
            <button className="toto-category__btn-edit"><span className="icon-edit"></span></button>
          </div>
          <div>
            <button className="toto-category__btn-remove"><span className="icon-trash-empty"></span></button>
            <button className="toto-category__btn-add"><span className="icon-plus-squared-alt"></span></button>
          </div>
        </div>
        {(isCategoryActive && category.subcategories) ?
          <div className="todo-category__subcategories">
            {category.subcategories.map(category => this.renderCategory(category, activeCategoryId))}
          </div>
          : null}
      </div>
    );
  };

  render() {
    const { category, activeCategoryId } = this.props;

    return this.renderCategory(category, activeCategoryId);
  }
}
