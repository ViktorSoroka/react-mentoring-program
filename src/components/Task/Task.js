import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Task.css';


export default class Task extends Component {
  onCompletedChange = e => {
    this.props.onCompletedChange({
      id: this.props.task.id,
      isCompleted: e.target.checked
    });
  };

  render() {
    const { task } = this.props;

    return (
      <div className="todo-task">
        <div>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={this.onCompletedChange}
          />
          <strong className="todo-task__title">{task.title}</strong>
        </div>
        <div>
          <Link
            className="todo-task__btn-edit"
            to={{ pathname: `/tasks/${task.id}` }}>
            <span className="icon-edit"/>
          </Link>
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  onCompletedChange: PropTypes.func.isRequired,
};
