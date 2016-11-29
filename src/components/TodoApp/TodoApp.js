import React, { Component } from 'react';

import Page        from '../Page/Page';
import Header      from '../Header/Header';
import MainSearch  from '../MainSearch/MainSearch';
import ProgressBar from '../ProgressBar/ProgressBar';
import Categories  from '../Categories/Categories';
import SubTasks    from '../SubTasks/SubTasks';


import { getTodoCategories } from '../../api/tododb';


class App extends Component {
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

    const asideContent = <Categories categories={categories} activeCategory={activeCategory}/>;
    const mainContent  = <SubTasks subtasks={subtasks}/>;

    return <Page {...{ header, asideContent, mainContent }}/>;
  }
}

export default App;
