import React, { Component } from 'react';

import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';
import Modal             from '../Modals/Modal/Modal';
import CategoryForm      from '../CategoryForm/CategoryForm';
import { Link }          from 'react-router';


import {
  deleteCategory,
  addNestedCategory,
  editCategory
} from '../../actions/TodoActions';

import './Category.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

export default class Category extends Component {
  onCategoryRemoval = () => {
    const { category, parentCategory } = this.props;

    this.confirmationDialog.show({
      modalTitle: `Are you sure want to remove ${category.title}?`,
      onConfirm : deleteCategory.bind(this, category, parentCategory)
    });
  };

  onNestedCategoryAdd = () => {
    const { category } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Write title for new category!`,
      onConfirm : addNestedCategory.bind(this, category)
    });
  };

  onCategoryEdit = () => {
    const { category } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Type new category title for selected category!`,
      onConfirm : editCategory.bind(this, category),
      data      : { categoryTitle: category.title }
    });
  };

  render() {
    const {
            category,
            activeSubtask,
            toggleChildrenVisibility
          } = this.props;

    return (
      <div>
        <div className="todo-category">
          <div>
            {isCategoryHasSubCategories(category) ?
              <input type="checkbox"
                     name="toggle-category"
                     onChange={toggleChildrenVisibility}/> : null}
            <Link className="todo-category__link"
                  to={{ pathname: `/category/${category.id}` }}
                  activeClassName="is-active">{category.title}</Link>
            {!activeSubtask &&
              <button className="toto-category__btn-edit"
                      onClick={this.onCategoryEdit}>
                <span className="icon-edit"/>
              </button>
            }
          </div>
          <div>
            {!activeSubtask ?
              <div>
                <button className="toto-category__btn-remove"
                        onClick={this.onCategoryRemoval}>
                  <span className="icon-trash-empty"/>
                </button>
                <button className="toto-category__btn-add"
                        onClick={this.onNestedCategoryAdd}>
                  <span className="icon-plus-squared-alt"/>
                </button>
              </div> :
              activeSubtask.categoryId !== category.id ?
                <button className="toto-category__btn-remove"
                        onClick={this.onCategoryRemoval}>
                  <span className="icon-trash-empty"/></button> : null }
          </div>
        </div>
        <ConfirmationModal ref={el => this.confirmationDialog = el}/>
        <Modal ref={el => this.categoryFormDialog = el}>
          <CategoryForm modalForm/>
        </Modal>
      </div>
    );
  }
}
