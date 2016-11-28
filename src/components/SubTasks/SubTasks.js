import React, { Component } from 'react';

import Search from '../Search/Search';

import './SubTasks.css';


export default class SubTasks extends Component {
  render() {
    return (
      <div className="todo-subtasks">
        <Search />
      </div>
    );
  }
}
