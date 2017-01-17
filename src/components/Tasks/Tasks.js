import React, { PropTypes } from 'react';

import Task from '../Task/Task';

import './Tasks.css';

import { connect } from 'react-redux';

import { updateTaskCompletion } from '../../actions/TodoActions';


function Tasks({ tasks, updateTaskCompletion }) {
  if (!tasks) {
    return (
      <div className="todo-tasks">
        <span className="todo-tasks__no-results">Choose category to show it tasks!</span>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="todo-tasks">
        <span className="todo-tasks__no-results">There are no todos, yet!</span>
      </div>
    );
  }

  return (
    <div className="todo-tasks">
      {tasks.map(task => {
        return <Task key={task.id}
                        task={task}
                        onCompletedChange={updateTaskCompletion}/>
      })}
    </div>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id   : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }))
};

const mapDispatchToProps = {
  updateTaskCompletion
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(Tasks);
