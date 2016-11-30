import React, { Component } from 'react';

import './EditSubTaskForm.css';


export default class EditSubTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.subtask.title,
      isComplete: props.subtask.isComplete
    };
  }

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onCompleteChange = e => {
    this.setState({
      isComplete: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log('submit');
  };

  render() {
    const { title, isComplete } = this.state;

    return (
      <form className="todo-edit-subtask-form" onSubmit={this.onSubmit}>
        <fieldset className="todo-edit-subtask-form__fieldset todo-edit-subtask-form__fieldset--align-right">
          <button className="todo-edit-subtask-form__btn" type="submit">Save Changes</button>
          <button className="todo-edit-subtask-form__btn" type="button">Cancel</button>
        </fieldset>
        <fieldset className="todo-edit-subtask-form__fieldset">
          <input type="text" value={title} onChange={this.onTitleChange}/><br/>
          <input type="checkbox" value={isComplete} onChange={this.onCompleteChange}/>Done
        </fieldset>
        <textarea className="todo-edit-subtask-form__textarea"
                  placeholder="description"
                  cols="30"
                  rows="10">
        </textarea>
      </form>
    );
  }
}
