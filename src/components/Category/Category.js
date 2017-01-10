import React, { Component, PropTypes } from 'react';

import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';
import Modal             from '../Modals/Modal/Modal';
import CategoryForm      from '../CategoryForm/CategoryForm';
import { Link }          from 'react-router';

import {
  deleteCategory,
  addNestedCategory,
  editCategory,
  changeSubtaskParent,
} from '../../actions/TodoActions';

import './Category.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

export default class Category extends Component {
  onCategoryRemoval = () => {
    const { category } = this.props;

    this.confirmationDialog.show({
      modalTitle: `Are you sure want to remove ${category.title}?`,
      onConfirm : deleteCategory.bind(this, category.id)
    });
  };

  onNestedCategoryAdd = () => {
    const { category } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Write title for new category!`,
      onConfirm : addNestedCategory.bind(this, category.id)
    });
  };

  onCategoryEdit = () => {
    const { category } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Type new category title for selected category!`,
      onConfirm : editCategory.bind(this, category.id),
      data      : { categoryTitle: category.title }
    });
  };

  onChangeSubtaskParent = () => {
    const { activeCategoryId, activeSubtask, category }  = this.props;

    changeSubtaskParent({
      currentCategoryId: activeCategoryId,
      targetCategoryId : category.id,
      subtaskId        : activeSubtask.id
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
                <button className="toto-category__btn-move"
                        onClick={this.onChangeSubtaskParent}>
                  <span className="icon-reply"/></button> : null }
          </div>
        </div>
        <ConfirmationModal ref={el => this.confirmationDialog = el}/>
        <Modal ref={el => this.categoryFormDialog = el}>
          <CategoryForm modalForm/>
        </Modal>
      </div>
    );
  }
};

Category.propTypes = {
  category                : PropTypes.object.isRequired,
  toggleChildrenVisibility: PropTypes.func.isRequired,
  activeSubtask           : PropTypes.object,
  parentCategory          : PropTypes.object,
  activeCategoryId        : PropTypes.string
};
