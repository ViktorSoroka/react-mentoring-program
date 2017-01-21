import React, { Component, PropTypes } from 'react';

import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';
import Modal             from '../Modals/Modal/Modal';
import CategoryForm      from '../CategoryForm/CategoryForm';
import { Link }          from 'react-router';

import { connect } from 'react-redux';

import {
  deleteCategory,
  addNestedCategory,
  updateCategory,
  changeTaskParent,
} from '../../actions/TodoActions';

import './Category.css';


const isCategoryHasSubCategories = ({ subcategories = [] } = {}) => subcategories.length;

class Category extends Component {
  onCategoryRemoval = () => {
    const { category } = this.props;

    this.confirmationDialog.show({
      modalTitle: `Are you sure want to remove ${category.title}?`,
      onConfirm : this.deleteSelectedCategory.bind(this, category.id)
    });
  };

  _getCategoryTreeData = (rootId, data = {
    categoriesToDelete: [],
    tasksToDelete     : []
  }) => {
    const category                              = this.props.getCategory(rootId);
    const { categoriesToDelete, tasksToDelete } = data;

    categoriesToDelete.push(rootId);
    tasksToDelete.push(...category.tasks);

    category.subcategories.forEach(id => this._getCategoryTreeData(id, data));

    return data;
  };

  deleteSelectedCategory = (id) => {
    const { deleteCategory } = this.props;

    const dataToDelete = this._getCategoryTreeData(id);

    deleteCategory({ ...dataToDelete, id });
  };

  onNestedCategoryAdd = () => {
    const { category, addNestedCategory } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Write title for new category!`,
      onConfirm : addNestedCategory.bind(this, category.id)
    });
  };

  onCategoryEdit = () => {
    const { category, updateCategory } = this.props;

    this.categoryFormDialog.show({
      modalTitle: `Type new category title for selected category!`,
      onConfirm : updateCategory.bind(this, category.id),
      data      : { categoryTitle: category.title }
    });
  };

  onChangeTaskParent = () => {
    const { activeCategoryId, activeTask, category, changeTaskParent } = this.props;

    changeTaskParent({
      currentCategoryId: activeCategoryId,
      targetCategoryId : category.id,
      id               : activeTask.id
    });
  };

  render() {
    const {
            category,
            activeTask,
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
            {!activeTask ?
              <Link className="todo-category__link"
                    to={{ pathname: `/category/${category.id}` }}
                    activeClassName="is-active">{category.title}</Link> : <span>{category.title}</span> }
            {!activeTask &&
            <button className="toto-category__btn-edit"
                    onClick={this.onCategoryEdit}>
              <span className="icon-edit"/>
            </button>
            }
          </div>
          <div>
            {!activeTask ?
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
              activeTask.categoryId !== category.id ?
                <button className="toto-category__btn-move"
                        onClick={this.onChangeTaskParent}>
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
}

Category.propTypes = {
  category                : PropTypes.object.isRequired,
  toggleChildrenVisibility: PropTypes.func.isRequired,
  activeTask              : PropTypes.object,
  parentCategory          : PropTypes.object,
  activeCategoryId        : PropTypes.string
};

const mapDispatchToProps = ({
  deleteCategory,
  addNestedCategory,
  updateCategory,
  changeTaskParent,
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(Category);
