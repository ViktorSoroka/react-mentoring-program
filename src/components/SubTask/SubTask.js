import React, { Component } from 'react';

import './SubTask.css';


export default class SubTask extends Component {
  render() {
    const { subtask } = this.props;

    return (
      <div className="todo-subtask">
        <div>
          <input type="checkbox"/>
          <strong className="todo-subtask__title">{subtask.title}</strong>
        </div>
        <div>
          <button className="todo-subtask__btn-edit"><span className="icon-edit"></span></button>
        </div>
      </div>
    );
  }
}
