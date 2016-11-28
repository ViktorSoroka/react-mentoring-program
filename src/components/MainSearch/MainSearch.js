import React, { Component } from 'react';

import './MainSearch.css';

export default class MainSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      showActive : false
    };
  }

  onSearchValueChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  onCheckboxChange = () => {
    this.setState({ showActive: !this.state.showActive });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log('submit');
  };

  render() {
    const { searchValue, showActive } = this.state;

    return (
      <div className="todo-main-search">
        <form className="todo-main-search-form" onSubmit={this.onSubmit}>
          <label className="todo-main-search-form__label">
            <input type="checkbox"
                   value={showActive}
                   onChange={this.onCheckboxChange}/>Show active
          </label>
          <input type="search"
                 placeholder="search"
                 value={searchValue}
                 onChange={this.onSearchValueChange}/>
        </form>
      </div>
    );
  }
}
