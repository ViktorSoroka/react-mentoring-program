import React, { PropTypes } from 'react';

import './ProgressBar.css';


export default function ProgressBar({ width }) {
  return (
    <div className="todo-progress-bar">
      <div className="todo-progress-bar__progress" style={{ width: `${width}%` }}></div>
    </div>
  );
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired
};
