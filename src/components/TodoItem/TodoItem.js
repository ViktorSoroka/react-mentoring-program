import React, { Component } from 'react';

import Page            from '../Page/Page';
import Header          from '../Header/Header';
import EditSubTaskForm from '../EditSubTaskForm/EditSubTaskForm';
import Categories      from '../Categories/Categories';


import { getTodoCategories } from '../../api/tododb';


export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories    : [],
      activeCategory: null,
      activeTodoItem: null
    };
  }

  componentDidMount() {
    getTodoCategories().then(result => {
      this.setState({
        categories    : result,
        activeCategory: result[0],
        activeSubTask : result[0].subtasks[0]
      });
    });
  }

  render() {
    const { categories, activeCategory, activeSubTask } = this.state;

    const header = <Header title={activeSubTask ? activeSubTask.title : null}/>;

    let asideContent = <Categories categories={categories} activeCategory={activeCategory}/>;

    const mainContent = activeSubTask ? <EditSubTaskForm subtask={activeSubTask}/> : null;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}
