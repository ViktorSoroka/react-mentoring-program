import React, { Component, PropTypes } from 'react';

import Page            from '../Page/Page';
import Header          from '../Header/Header';
import EditSubTaskForm from '../EditSubTaskForm/EditSubTaskForm';
import CategoryTrees   from '../CategoryTrees/CategoryTrees';

import { updateTask } from '../../actions/TodoActions';

import { connect } from 'react-redux';


class TodoItem extends Component {
  componentDidMount() {
    this.checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  componentWillUpdate() {
    this.checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  getSubTask(subtaskId) {
    return this.props.subtasks[subtaskId];
  }

  getCategory = categoryId => {
    return this.props.categories[categoryId];
  };

  checkActiveTaskPresence(activeSubTaskId, router) {
    if (activeSubTaskId && !this.getSubTask(activeSubTaskId)) {
      return router.replace('/');
    }
  }

  render() {
    const { categories, updateTask } = this.props;

    const activeSubTaskId = this.props.params.id;
    const activeTask      = this.getSubTask(activeSubTaskId) || {};

    const header = <Header title={activeTask ? activeTask.title : null}/>;

    let asideContent = <CategoryTrees categories={categories}
                                      activeCategoryId={activeTask.categoryId}
                                      activeSubtask={activeTask}
                                      getCategory={this.getCategory}/>;

    const mainContent = activeTask ? <EditSubTaskForm subtask={activeTask} onFormSubmit={updateTask}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoItem.propTypes = {
  params: PropTypes.object.isRequired
};

export default connect(state => ({
    categories: state.categories,
    subtasks  : state.subtasks
  }),
  {
    updateTask
  })(TodoItem);
