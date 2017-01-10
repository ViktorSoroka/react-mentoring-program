import React, { Component, PropTypes } from 'react';

import Category from '../Category/Category';

import './CategoryTree.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

export default class CategoryTree extends Component {
  state = { showChildren: true };

  toggleChildrenVisibility = () => {
    this.setState({
      showChildren: !this.state.showChildren
    });
  };

  render() {
    const { category, getCategory } = this.props;

    const newCategoryProps = {
      toggleChildrenVisibility: this.toggleChildrenVisibility
    };

    return (
      <div className="todo-category-tree"
           key={category.id}>
        <Category {...this.props} {...newCategoryProps}/>
        {(isCategoryHasSubCategories(category) && this.state.showChildren) ?
          <div className="todo-category-tree__subcategories">
            {category.subcategories.map(childCategoryId => {
                const childCategory = getCategory(childCategoryId);
                return <CategoryTree {...this.props}
                                     key={childCategory.id}
                                     parentCategory={category}
                                     category={childCategory}/>
              }
            )}
          </div>
          : null}
      </div>
    );
  }
}

CategoryTree.propTypes = {
  category        : PropTypes.object.isRequired,
  activeSubtask   : PropTypes.object,
  parentCategory  : PropTypes.object,
  activeCategoryId: PropTypes.string
};
