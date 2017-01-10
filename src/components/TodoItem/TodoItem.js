import React, { Component, PropTypes } from 'react';

import Page            from '../Page/Page';
import Header          from '../Header/Header';
import EditSubTaskForm from '../EditSubTaskForm/EditSubTaskForm';
import CategoryTrees   from '../CategoryTrees/CategoryTrees';

import { updateTask } from '../../actions/TodoActions';

import TodoStore from '../../stores/TodosStore';


const checkActiveTaskPresence = (activeTaskId, router) => {
  if (activeTaskId && !TodoStore.getActiveTask(activeTaskId)) {
    return router.replace('/');
  }
};

export default class TodoItem extends Component {
  state = TodoStore.getTodoState();

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);

    checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  componentWillUpdate() {
    checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  onFormSubmit = data => {
    updateTask(data);
  };

  render() {
    const { categories } = this.state;

    const activeTaskId = this.props.params.id;
    const activeTask   = TodoStore.getActiveTask(activeTaskId) || {};

    const header = <Header title={activeTask ? activeTask.title : null}/>;

    let asideContent = <CategoryTrees categories={categories}
                                      activeCategoryId={activeTask.categoryId}
                                      activeSubtask={activeTask}
                                      getCategory={TodoStore.getCategory}/>;

    const mainContent = activeTask ? <EditSubTaskForm subtask={activeTask} onFormSubmit={this.onFormSubmit}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }

  _onChange = () => {
    this.setState(TodoStore.getTodoState());
  };
}

TodoItem.propTypes = {
  params: PropTypes.object.isRequired
};
