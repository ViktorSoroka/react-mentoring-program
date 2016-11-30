import React, { Component } from 'react';

import Page        from '../Page/Page';
import Header      from '../Header/Header';
import MainSearch  from '../MainSearch/MainSearch';
import Search      from '../Search/Search';
import ProgressBar from '../ProgressBar/ProgressBar';
import Categories  from '../Categories/Categories';
import SubTasks    from '../SubTasks/SubTasks';


import { getTodoCategories } from '../../api/tododb';


export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories    : [],
      activeCategory: null
    };
  }

  componentDidMount() {
    getTodoCategories().then(result => {
      this.setState({
        categories    : result,
        activeCategory: result[0],
      });
    });
  }

  render() {
    const { categories, activeCategory } = this.state;

    const subtasks = activeCategory ? activeCategory.subtasks : [];
    const header   = (
      <Header title="To-Do List">
        <MainSearch />
        <ProgressBar width="70%"/>
      </Header>);

    let asideContent = <div>
      <Search placeholder={"Enter category title"}/>
      <Categories categories={categories} activeCategory={activeCategory}/>
    </div>;

    const mainContent = <div>
      <Search placeholder={"Enter subtask title"}/>
      <SubTasks subtasks={subtasks}/>
    </div>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}
