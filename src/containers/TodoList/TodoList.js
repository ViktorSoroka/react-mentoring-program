import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import MainSearch from '../../components/MainSearch/MainSearch';
import Search from '../../components/Search/Search';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CategoryTrees from '../../components/CategoryTrees/CategoryTrees';
import Tasks from '../../components/Tasks/Tasks';
import UndoRedo from '../../containers/UndoRedo/UndoRedo';

import { connect } from 'react-redux';

import {
  addCategory,
  addTask
} from '../../actions/TodoActions';


class TodoList extends Component {
  componentDidMount() {
    this.checkActiveCategoryPresence();
  }

  componentWillUpdate() {
    this.checkActiveCategoryPresence(this.props.match.params.id);
  }

  getCategory = categoryId => {
    return this.props.categories[categoryId];
  };

  checkActiveCategoryPresence() {
    const { history, match: { params: { id } } } = this.props;
    if (id && !this.getCategory(id)) {
      return history.push('/');
    }
  }

  getTasks(tasks, activeCategory) {
    let { location: { search } } = this.props;
    const queryParams = qs.parse(search.slice(1));
    let { showDone, taskName } = queryParams;

    showDone = showDone && JSON.parse(showDone);

    if (!activeCategory) {
      return null;
    }

    return activeCategory.tasks.reduce((res, id) => {
      const task = tasks[id];

      if ((taskName && !(new RegExp(`^${taskName}`)).test(task.title)) ||
        (showDone && !task.isCompleted)) return res;

      res.push(task);

      return res;
    }, []);
  }

  calculateProgressWidth(tasks) {
    if (!tasks) return 0;
    if (!tasks.length) return 100;

    return Math.round(tasks.reduce((completedTasks, task) => task.isCompleted ? completedTasks + 1 : completedTasks,
      0) / tasks.length * 100);
  }

  render() {
    const { categories, tasks, addCategory, addTask, match } = this.props;
    const activeCategoryId = match.params.id;

    const categoryTasks = this.getTasks(tasks, this.getCategory(activeCategoryId));
    const progressWidth = this.calculateProgressWidth(categoryTasks);

    const header =
      <Header title="To-Do List">
        <MainSearch/>
        <ProgressBar width={progressWidth}/>
        <UndoRedo/>
      </Header>;

    const asideContent = <div>
      <Search
        handleSubmit={addCategory}
        placeholder={"Enter category title"}
      />
      <CategoryTrees
        categories={categories}
        activeCategoryId={activeCategoryId}
        getCategory={this.getCategory}
      />
    </div>;

    const mainContent = <div>
      <Search
        handleSubmit={addTask}
        isSubmitDisabled={() => !activeCategoryId}
        payload={{ targetCategoryId: activeCategoryId }}
        placeholder={"Enter task title"}
      />
      <Tasks tasks={categoryTasks}/>
    </div>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  addCategory: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.present,
  tasks: state.tasks.present
});

const mapDispatchToProps = {
  addCategory,
  addTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
