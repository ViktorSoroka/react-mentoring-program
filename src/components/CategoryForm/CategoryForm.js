import React, { Component, PropTypes } from 'react';

import './CategoryForm.css';


export default class CategoryForm extends Component {
  state = {
    invalid      : false,
    categoryTitle: (this.props.data && this.props.data.categoryTitle) || ''
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { categoryTitle } = this.state;

    if (!categoryTitle) {
      return this.setState({ invalid: true });
    }

    this.props.modalForm ?
      this.props.onConfirm(categoryTitle) : this.props.onFormSubmit(categoryTitle);

    this.setState({ invalid: false, categoryTitle: '' });
  };

  onCategoryTitleChange = e => {
    this.setState({ categoryTitle: e.target.value });
  };

  render() {
    const { categoryTitle, invalid } = this.state;

    return (
      <div>
        <form className="category-form" onSubmit={this.onFormSubmit}>
          <input type="text"
                 value={categoryTitle}
                 onChange={this.onCategoryTitleChange}/>
          {invalid ? <span className="category-form__error-msg">Please enter valid category title.</span> : null }
          <div className="category-form-btn-wrap">
            <button className="category-form-btn"
                    type="sumbit">Submit
            </button>
            {this.props.modalForm ?
              <button className="category-form-btn"
                      type="button"
                      onClick={this.props.onCancel}>Cancel</button> : null}
          </div>
        </form>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  modalForm   : PropTypes.bool,
  onConfirm   : PropTypes.func,
  onFormSubmit: PropTypes.func
};
