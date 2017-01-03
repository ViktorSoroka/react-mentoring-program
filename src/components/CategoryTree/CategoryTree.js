import React, { Component } from 'react';

import Category from '../Category/Category';

import './CategoryTree.css';


export default class CategoryWithSubCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChildren: true
    }
  }

  static isCategoryActive(categoryId, activeCategoryId) {
    return categoryId === activeCategoryId;
  }

  toggleChildrenVisibility = () => {
    this.setState({
      showChildren: !this.state.showChildren
    });
  };

  setActiveCategory = category => {
    this.props.setActiveCategory(category);
  };

  renderCategory = (category, activeCategoryId) => {
    const isCategoryActive = this.constructor.isCategoryActive(category.id, activeCategoryId);

    return (
      <div className="todo-category-tree"
           key={category.id}>
        <Category category={category}
                  isCategoryActive={isCategoryActive}
                  setActiveCategory={this.setActiveCategory}
                  toggleChildrenVisibility={this.toggleChildrenVisibility}/>
        {(category.subcategories && this.state.showChildren) ?
          <div className="todo-category-tree__subcategories">
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
