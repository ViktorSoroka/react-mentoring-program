import React, { Component } from 'react';

import './ProgressBar.css';

export default class ProgressBar extends Component {
  render() {
    return (
      <div className="todo-progress-bar">
        <div className="todo-progress-bar__progress" style={{ width: this.props.width }}></div>
      </div>
    );
  }
}
