import React, { Component, PropTypes } from 'react';

import './EditSubTaskForm.css';


export default class EditSubTaskForm extends Component {
  state = { invalid: false };

  onSubmit = e => {
    e.preventDefault();

    const { subtask } = this.props;

    const formData = {
      subtaskId  : subtask.id,
      title      : this.titleInput.value,
      isCompleted: this.isCompleteInput.checked,
      description: this.descriptionInput.value
    };

    if (!formData.title) {
      return this.setState({ invalid: true });
    }

    this.props.onFormSubmit(formData);
    this.context.router.push(`/category/${subtask.categoryId}`);
  };

  render() {
    const { title, isCompleted, description } = this.props.subtask;

    const { invalid } = this.state;

    console.log(this.props.subtask);

    return (
      <form className="todo-edit-subtask-form" onSubmit={this.onSubmit}>
        <fieldset className="todo-edit-subtask-form__fieldset todo-edit-subtask-form__fieldset--align-right">
          <button className="todo-edit-subtask-form__btn" type="submit">Save Changes</button>
          <button className="todo-edit-subtask-form__btn" type="button" onClick={this.context.router.goBack}>Cancel
          </button>
        </fieldset>
        <fieldset className="todo-edit-subtask-form__fieldset">
          <div>
            <input type="text" defaultValue={title} ref={input => this.titleInput = input}/>
            {invalid ? <span className="todo-edit-subtask-form__error-msg">title could not be empty</span> : null}
          </div>
          <label><input type="checkbox" defaultChecked={isCompleted}
                        ref={input => this.isCompleteInput = input}/>Done</label>
        </fieldset>
        <textarea className="todo-edit-subtask-form__textarea"
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

EditSubTaskForm.contextTypes = {
  router  : PropTypes.object
};
