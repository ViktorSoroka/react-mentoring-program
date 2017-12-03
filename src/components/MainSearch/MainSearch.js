import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import './MainSearch.css';


class MainSearch extends Component {
  onCheckboxChange = e => {
    this.updateQuery({
      showDone: e.target.checked
    });
  };

  updateQuery(data) {
    const { location, history } = this.props;

    const queryParams = qs.parse(location.search.slice(1));

    history.push({
      ...location,
      search: qs.stringify({ ...queryParams, ...data })
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
            <input
              type="checkbox"
              onChange={this.onCheckboxChange}/>Show done only
          </label>
          <input
            type="search"
            placeholder="search"
            ref={input => this.searchInput = input}/>
        </form>
      </div>
    );
  }
}

MainSearch.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(MainSearch);
