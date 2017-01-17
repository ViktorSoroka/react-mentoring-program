import React, { Component, PropTypes } from 'react';

import Page          from '../../components/Page/Page';
import Header        from '../../components/Header/Header';
import MainSearch    from '../../components/MainSearch/MainSearch';
import Search        from '../../components/Search/Search';
import ProgressBar   from '../../components/ProgressBar/ProgressBar';
import CategoryTrees from '../../components/CategoryTrees/CategoryTrees';
import Tasks         from '../../components/Tasks/Tasks';

import { v4 } from 'node-uuid';

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

  getTasks(tasks, activeCategory) {
    let { router: { location: { query: { showDone, taskName } } } } = this.props;

    showDone = showDone && JSON.parse(showDone);

    if (!activeCategory) {
      return null;
    }

    return activeCategory.tasks.reduce((res, taskId) => {
      const task = tasks[taskId];

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
    const { categories, tasks, addCategory, addTask } = this.props;
    const activeCategoryId                            = this.props.params.id;

    const categoryTasks = this.getTasks(tasks, this.getCategory(activeCategoryId));
    const progressWidth = this.calculateProgressWidth(categoryTasks);

    const header =
      <Header title="To-Do List">
        <MainSearch />
        <ProgressBar width={progressWidth}/>
      </Header>;

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
              isSubmitDisabled={() => !activeCategoryId}
              payload={{ targetCategoryId: activeCategoryId }}
              placeholder={"Enter task title"}/>
      <Tasks tasks={categoryTasks}/>
    </div>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

TodoList.propTypes = {
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories,
  tasks     : state.tasks
});

const mapDispatchToProps = {
  addCategory,
  addTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
