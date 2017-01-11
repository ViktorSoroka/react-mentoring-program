import React, { Component, PropTypes } from 'react';

import Page          from '../Page/Page';
import Header        from '../Header/Header';
import MainSearch    from '../MainSearch/MainSearch';
import Search        from '../Search/Search';
import ProgressBar   from '../ProgressBar/ProgressBar';
import CategoryTrees from '../CategoryTrees/CategoryTrees';
import SubTasks      from '../SubTasks/SubTasks';

import { connect } from 'react-redux';

import {
  addCategory,
  addTask
} from '../../actions/TodoActions';


class TodoList extends Component {
  componentDidMount() {
    this.checkActiveCategoryPresence(this.props.params.id, this.props.router);
  }

  componentWillUpdate() {
    this.checkActiveCategoryPresence(this.props.params.id, this.props.router);
  }

  getCategory = categoryId => {
    return this.props.categories[categoryId];
  };

  checkActiveCategoryPresence(activeCategoryId, router) {
    if (activeCategoryId && !this.getCategory(activeCategoryId)) {
      return router.replace('/');
    }
  }

  getSubtasks(subtasks, activeCategory) {
    let { router: { location: { query: { showDone, taskname } } } } = this.props;

    showDone = showDone && JSON.parse(showDone);

    if (!activeCategory) {
      return null;
    }

    return activeCategory.subtasks.reduce((res, subtaskId) => {
      const subtask = subtasks[subtaskId];

      if ((taskname && !(new RegExp(`^${taskname}`)).test(subtask.title)) ||
        (showDone && !subtask.isCompleted)) return res;

      res.push(subtask);

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
    const { categories, subtasks, addCategory, addTask } = this.props;
    const activeCategoryId                               = this.props.params.id;

    const categoryTasks = this.getSubtasks(subtasks, this.getCategory(activeCategoryId));
    const progressWidth = this.calculateProgressWidth(categoryTasks);

    const header = (
      <Header title="To-Do List">
        <MainSearch />
        <ProgressBar width={progressWidth}/>
      </Header>);

    const asideContent = <div>
      <Search handleSubmit={addCategory}
              placeholder={"Enter category title"}/>
      <CategoryTrees categories={categories}
                     activeCategoryId={activeCategoryId}
                     getCategory={this.getCategory}
      />
    </div>;

    const mainContent = <div>
      <Search handleSubmit={addTask}
              payload={{ targetCategoryId: activeCategoryId }}
              placeholder={"Enter subtask title"}/>
      <SubTasks subtasks={categoryTasks}/>
    </div>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoList.propTypes = {
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories,
  subtasks  : state.subtasks
});

const mapDispatchToProps = {
  addCategory,
  addTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
