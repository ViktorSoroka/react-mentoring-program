import React, { Component, PropTypes } from 'react';

import './MainSearch.css';


export default class MainSearch extends Component {
  onCheckboxChange = e => {
    this.updateQuery({
      showDone: e.target.checked
    });
  };

  updateQuery(data) {
    const { router }   = this.context;
    const { location } = router;

    router.push({
      ...location,
      query: {
        ...location.query,
        ...data
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();

    this.updateQuery({
      taskName: this.searchInput.value
    });
  };

  render() {
    return (
      <div className="todo-main-search">
        <form className="todo-main-search-form" onSubmit={this.onSubmit}>
          <label className="todo-main-search-form__label">
            <input type="checkbox"
                   onChange={this.onCheckboxChange}/>Show done only</label>
          <input type="search"
                 placeholder="search"
                 ref={input => this.searchInput = input}/>
        </form>
      </div>
    );
  }
};

MainSearch.contextTypes = {
  router: PropTypes.object
};
