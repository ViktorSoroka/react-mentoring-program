import React, { Component } from 'react';

import Search from '../Search/Search';
import SubTask from '../SubTask/SubTask';

import './SubTasks.css';


export default class SubTasks extends Component {
  render() {
    const { subtasks } = this.props;

    return (
      <div className="todo-subtasks">
        <Search />
        <div className="todo-subtasks__subtasks">
          {subtasks.map(subtask => {
            return <SubTask key={subtask.id}
                            subtask={subtask}/>
          })}
        </div>
      </div>
    );
  }
}
