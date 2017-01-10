import React, { PropTypes } from 'react';

import SubTask from '../SubTask/SubTask';

import './SubTasks.css';

import { updateTaskCompletion } from '../../actions/TodoActions';


export default function SubTasks({ subtasks }) {
  if (!subtasks) {
    return (
      <div className="todo-subtasks">
        <span className="todo-subtasks__no-results">Choose category to show it subtasks!</span>
      </div>
    );
  }

  if (!subtasks.length) {
    return (
      <div className="todo-subtasks">
        <span className="todo-subtasks__no-results">There are no todos, yet!</span>
      </div>
    );
  }

  return (
    <div className="todo-subtasks">
      {subtasks.map(subtask => {
        return <SubTask key={subtask.id}
                        subtask={subtask}
                        onCompletedChange={updateTaskCompletion}/>
      })}
    </div>
  );
}

SubTasks.propTypes = {
  subtasks: PropTypes.arrayOf(PropTypes.shape({
    id   : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }))
};
