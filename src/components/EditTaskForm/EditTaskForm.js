import React, { Component, PropTypes } from 'react';

import './EditTaskForm.css';


export default class EditTaskForm extends Component {
  state = { invalid: false };

  onSubmit = e => {
    e.preventDefault();

    const { task } = this.props;

    const formData = {
      taskId  : task.id,
      title      : this.titleInput.value,
      isCompleted: this.isCompleteInput.checked,
      description: this.descriptionInput.value
    };

    if (!formData.title) {
      return this.setState({ invalid: true });
    }

    this.props.onFormSubmit(formData);
    this.context.router.push(`/category/${task.categoryId}`);
  };

  render() {
    const { title, isCompleted, description } = this.props.task;

    const { invalid } = this.state;

    return (
      <form className="todo-edit-task-form" onSubmit={this.onSubmit}>
        <fieldset className="todo-edit-task-form__fieldset todo-edit-task-form__fieldset--align-right">
          <button className="todo-edit-task-form__btn"
                  type="submit">Save Changes</button>
          <button className="todo-edit-task-form__btn"
                  type="button"
                  onClick={this.context.router.goBack}>Cancel
          </button>
        </fieldset>
        <fieldset className="todo-edit-task-form__fieldset">
          <div>
            <input type="text"
                   autoFocus
                   defaultValue={title}
                   ref={input => this.titleInput = input}/>
            {invalid ? <span className="todo-edit-task-form__error-msg">title could not be empty</span> : null}
          </div>
          <label><input type="checkbox"
                        defaultChecked={isCompleted}
                        ref={input => this.isCompleteInput = input}/>Done</label>
        </fieldset>
        <textarea className="todo-edit-task-form__textarea"
                  ref={input => this.descriptionInput = input}
                  defaultValue={description}
                  placeholder="description"
                  cols="30"
                  rows="10">
        </textarea>
      </form>
    );
  }
}

EditTaskForm.contextTypes = {
  router: PropTypes.object
};

EditTaskForm.propTypes = {
  task     : PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
