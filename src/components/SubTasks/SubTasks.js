import React, { Component } from 'react';

import SubTask from '../SubTask/SubTask';

import './SubTasks.css';


export default class SubTasks extends Component {
  render() {
    const { subtasks = [] } = this.props;

    return (
      <div className="todo-subtasks">
        {subtasks.length === 0 ?
          <span className="todo-subtasks__no-results">There are no todos, yet!</span> :
          subtasks.map(subtask => {
            return <SubTask key={subtask.id}
                            subtask={subtask}/>
          })}
      </div>
    );
  }
}
