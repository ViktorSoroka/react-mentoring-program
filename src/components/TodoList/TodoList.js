import React, { Component } from 'react';

import Page        from '../Page/Page';
import Header      from '../Header/Header';
import MainSearch  from '../MainSearch/MainSearch';
import Search      from '../Search/Search';
import ProgressBar from '../ProgressBar/ProgressBar';
import Categories  from '../Categories/Categories';
import SubTasks    from '../SubTasks/SubTasks';

import { fetchTodos } from '../../actions/TodoActions';
import TodoStore from '../../stores/TodosStore';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = TodoStore.getTodoState();
  }

  _onChange = () => {
    this.setState(TodoStore.getTodoState());
  };

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
    fetchTodos();
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  render() {
    const { todos, activeCategory } = this.state;

    const subtasks = activeCategory ? activeCategory.subtasks : [];
    const header   = (
      <Header title="To-Do List">
        <MainSearch />
        <ProgressBar width="70%"/>
      </Header>);

    let asideContent = <div>
      <Search placeholder={"Enter category title"}/>
      <Categories categories={todos} activeCategory={activeCategory}/>
    </div>;

    const mainContent = <div>
      <Search placeholder={"Enter subtask title"}/>
      <SubTasks subtasks={subtasks}/>
    </div>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}
