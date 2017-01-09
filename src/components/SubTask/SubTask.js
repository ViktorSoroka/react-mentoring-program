import React, { Component } from 'react';

import { Link }  from 'react-router';

import './SubTask.css';


export default class SubTask extends Component {
  onCompletedChange = e => {
    this.props.onCompletedChange({
      subtaskId  : this.props.subtask.id,
      isCompleted: e.target.checked
    });
  };

  render() {
    const { subtask } = this.props;

    return (
      <div className="todo-subtask">
        <div>
          <input type="checkbox"
                 checked={subtask.isCompleted}
                 onChange={this.onCompletedChange}/>
          <strong className="todo-subtask__title">{subtask.title}</strong>
        </div>
        <div>
          <Link className="todo-subtask__btn-edit"
                to={{ pathname: `/tasks/${subtask.id}` }}><span className="icon-edit"/></Link>
        </div>
      </div>
    );
  }
}
