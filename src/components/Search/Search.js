import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.css';


export default class Search extends Component {
  state = { searchValue: '' };

  onSearchValueChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.handleSubmit(this.state.searchValue, this.props.payload);
    this.setState({ searchValue: '' });
  };

  isSubmitDisabled() {
    const { isSubmitDisabled } = this.props;

    return !this.state.searchValue || (isSubmitDisabled && isSubmitDisabled());
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className="todo-search">
        <form className="todo-search-form" onSubmit={this.onSubmit}>
          <input
            className="todo-search-form__input"
            placeholder={this.props.placeholder}
            value={searchValue}
            onChange={this.onSearchValueChange}
          />
          <input
            className="todo-search-form__btn-submit"
            disabled={this.isSubmitDisabled()}
            type="submit"
            value="Add"
          />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  isSubmitDisabled: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  payload: PropTypes.object
};
