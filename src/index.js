import React    from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList/TodoList';
// import TodoItem from './components/TodoItem/TodoItem';
import { initDb } from './utils/StorageUtils';

import './index.css';

initDb();


ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
