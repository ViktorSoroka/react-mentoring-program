import React, { Component } from 'react';

import Category from '../Category/Category';

import './CategoryTree.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

export default class CategoryWithSubCategories extends Component {
  state = { showChildren: true };

  toggleChildrenVisibility = () => {
    this.setState({
      showChildren: !this.state.showChildren
    });
  };

  render() {
    const { category } = this.props;

    const newCategoryProps = {
      toggleChildrenVisibility: this.toggleChildrenVisibility
    };

    return (
      <div className="todo-category-tree"
           key={category.id}>
        <Category {...this.props} {...newCategoryProps}/>
        {(isCategoryHasSubCategories(category) && this.state.showChildren) ?
          <div className="todo-category-tree__subcategories">
            {category.subcategories.map((childCategory, index) =>
              <CategoryWithSubCategories {...this.props}
                                         key={childCategory.id}
                                         parentCategory={category}
                                         category={childCategory}/>
            )}
          </div>
          : null}
      </div>
    );
  }
}
