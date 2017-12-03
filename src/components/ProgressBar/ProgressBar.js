import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';


export default function ProgressBar({ width }) {
  return (
    <div className="todo-progress-bar">
      <div className="todo-progress-bar__progress" style={{ width: `${width}%` }}/>
    </div>
  );
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired
};
