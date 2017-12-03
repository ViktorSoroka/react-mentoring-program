import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../NotFound/NotFound';
import TodoItem from '../../containers/TodoItem/TodoItem';
import TodoList from '../../containers/TodoList/TodoList';

export default function App() {
  return (
    <Switch>
      <Redirect from="/" to="/category" exact={true} />
      <Route path="/category/:id?" exact={true} component={TodoList}/>
      <Route path="/tasks/:id" exact={true} component={TodoItem}/>
      <Route component={NotFound}/>
    </Switch>
  );
}
