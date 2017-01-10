import React, { Component, PropTypes } from 'react';

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

  render() {
    const { searchValue } = this.state;

    return (
      <div className="todo-search">
        <form className="todo-search-form" onSubmit={this.onSubmit}>
          <input type="text"
                 placeholder={this.props.placeholder}
                 value={searchValue}
                 onChange={this.onSearchValueChange}/>
          <input type="submit" value="Add"/>
        </form>
      </div>
    );
  }
};

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  placeholder : PropTypes.string.isRequired,
};
