import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import EditTaskForm from '../../components/EditTaskForm/EditTaskForm';
import CategoryTrees from '../../components/CategoryTrees/CategoryTrees';

import { updateTask } from '../../actions/TodoActions';


class TodoItem extends Component {
  componentDidMount() {
    this.checkActiveTaskPresence();
  }

  componentWillUpdate() {
    this.checkActiveTaskPresence();
  }

  getTask(id) {
    return this.props.tasks[id];
  }

  getCategory = categoryId => {
    return this.props.categories[categoryId];
  };

  checkActiveTaskPresence() {
    const { history, match: { params: { id } } } = this.props;
    if (id && !this.getTask(id)) {
      return history.push('/');
    }
  }

  render() {
    const { categories, updateTask, match } = this.props;

    const activeTaskId = match.params.id;
    const activeTask = this.getTask(activeTaskId) || {};

    const header = <Header title={activeTask ? activeTask.title : null}/>;

    let asideContent = (
      <CategoryTrees
        categories={categories}
        activeCategoryId={activeTask.categoryId}
        activeTask={activeTask}
        getCategory={this.getCategory}
      />
    );

    const mainContent = activeTask ? <EditTaskForm task={activeTask} onFormSubmit={updateTask}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoItem.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired
};

export default connect(state => ({
    categories: state.categories.present,
    tasks: state.tasks.present
  }),
  {
    updateTask
  })(TodoItem);
