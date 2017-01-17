import React, { Component, PropTypes } from 'react';

import Page          from '../../components/Page/Page';
import Header        from '../../components/Header/Header';
import EditTaskForm  from '../../components/EditTaskForm/EditTaskForm';
import CategoryTrees from '../../components/CategoryTrees/CategoryTrees';

import { updateTask } from '../../actions/TodoActions';

import { connect } from 'react-redux';


class TodoItem extends Component {
  componentDidMount() {
    this.checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  componentWillUpdate() {
    this.checkActiveTaskPresence(this.props.params.id, this.props.router);
  }

  getTask(taskId) {
    return this.props.tasks[taskId];
  }

  getCategory = categoryId => {
    return this.props.categories[categoryId];
  };

  checkActiveTaskPresence(activeTaskId, router) {
    if (activeTaskId && !this.getTask(activeTaskId)) {
      return router.replace('/');
    }
  }

  render() {
    const { categories, updateTask } = this.props;

    const activeTaskId = this.props.params.id;
    const activeTask   = this.getTask(activeTaskId) || {};

    const header = <Header title={activeTask ? activeTask.title : null}/>;

    let asideContent = <CategoryTrees categories={categories}
                                      activeCategoryId={activeTask.categoryId}
                                      activeTask={activeTask}
                                      getCategory={this.getCategory}/>;

    const mainContent = activeTask ? <EditTaskForm task={activeTask} onFormSubmit={updateTask}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoItem.propTypes = {
  params: PropTypes.object.isRequired
};

export default connect(state => ({
    categories: state.categories,
    tasks     : state.tasks
  }),
  {
    updateTask
  })(TodoItem);
