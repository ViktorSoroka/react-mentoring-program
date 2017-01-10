import React, { Component, PropTypes } from 'react';

import Page          from '../Page/Page';
import Header        from '../Header/Header';
import MainSearch    from '../MainSearch/MainSearch';
import Search        from '../Search/Search';
import ProgressBar   from '../ProgressBar/ProgressBar';
import CategoryTrees from '../CategoryTrees/CategoryTrees';
import SubTasks      from '../SubTasks/SubTasks';

import {
  addCategory,
  addTask
} from '../../actions/TodoActions';

import TodoStore from '../../stores/TodosStore';


const checkActiveCategoryPresence = (activeCategoryId, router) => {
  if (activeCategoryId && !TodoStore.getCategory(activeCategoryId)) {
    return router.replace('/');
  }
};

export default class TodoList extends Component {
  state = TodoStore.getTodoState();

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);

    checkActiveCategoryPresence(this.props.params.id, this.props.router);
  }

  componentWillUpdate() {
    checkActiveCategoryPresence(this.props.params.id, this.props.router);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
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
    const { categories, subtasks } = this.state;
    const activeCategoryId    = this.props.params.id;

    const categoryTasks = this.getSubtasks(subtasks, TodoStore.getCategory(activeCategoryId));
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
                     getCategory={TodoStore.getCategory}
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

  _onChange = () => {
    this.setState(TodoStore.getTodoState());
  };
}

TodoList.propTypes = {
  params: PropTypes.object.isRequired
};
