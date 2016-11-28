import React, { Component } from 'react';

import MainSearch  from '../MainSearch/MainSearch';
import ProgressBar from '../ProgressBar/ProgressBar';
import Categories  from '../Categories/Categories';
import SubTasks    from '../SubTasks/SubTasks';


import { getTodoCategories } from '../../api/tododb';
import './TodoApp.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories      : [],
      activeCategoryId: null
    };
  }

  componentDidMount() {
    getTodoCategories().then(result => {
      this.setState({
        categories      : result,
        activeCategoryId: result[0].id
      });
    });
  }

  render() {
    const { categories, activeCategoryId } = this.state;

    return (
      <div className="todo">
        <header className="todo-header">
          <div className="todo__row">
            <h1>To-Do List</h1>
            <MainSearch />
          </div>
          <ProgressBar width="70%"/>
        </header>
        <main className="todo-main">
          <div className="todo__row">
            <Categories categories={categories} activeCategoryId={activeCategoryId}/>
            <SubTasks />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
