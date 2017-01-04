import React, { Component } from 'react';

import './Category.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

export default class Category extends Component {
  render() {
    const {
            category,
            setActiveCategory,
            isCategoryActive,
            toggleChildrenVisibility
          } = this.props;

    return (
      <div className={"todo-category" + (isCategoryActive ? " is-active" : "")}
           onClick={() => setActiveCategory(category)}>
        <div>
          {isCategoryHasSubCategories(category) ? <input type="checkbox" onChange={() => toggleChildrenVisibility()} name="toggle-category"/> : null}
          <strong className="todo-category__title">{category.title}</strong>
          <button className="toto-category__btn-edit"><span className="icon-edit"></span></button>
        </div>
        <div>
          <button className="toto-category__btn-remove"><span className="icon-trash-empty"></span></button>
          <button className="toto-category__btn-add"><span className="icon-plus-squared-alt"></span></button>
        </div>
      </div>
    );
  }
}
