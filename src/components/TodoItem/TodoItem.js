import React, { Component } from 'react';

import Page            from '../Page/Page';
import Header          from '../Header/Header';
import EditSubTaskForm from '../EditSubTaskForm/EditSubTaskForm';
import CategoryTrees   from '../CategoryTrees/CategoryTrees';

import { updateTask } from '../../actions/TodoActions';

import TodoStore from '../../stores/TodosStore';

export default class TodoList extends Component {
  state = TodoStore.getTodoState();

  componentDidMount() {
    const activeTaskId = this.props.params.id;

    TodoStore.addChangeListener(this._onChange);

    if (activeTaskId && !TodoStore.getActiveTask(activeTaskId)) {
      return this.props.router.replace('/');
    }
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  onFormSubmit = data => {
    updateTask(data);
  };

  render() {
    const { todos } = this.state;

    const activeTaskId = this.props.params.id;
    const activeTask   = TodoStore.getActiveTask(activeTaskId) || {};

    const header = <Header title={activeTask ? activeTask.title : null}/>;

    let asideContent = <CategoryTrees categories={todos}
                                      activeCategoryId={activeTask.categoryId}
                                      activeSubtask={activeTask}/>;

    const mainContent = activeTask ? <EditSubTaskForm subtask={activeTask} onFormSubmit={this.onFormSubmit}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }

  _onChange = () => {
    this.setState(TodoStore.getTodoState());
  };
}
