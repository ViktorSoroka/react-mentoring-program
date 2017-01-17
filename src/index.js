import React    from 'react';
import ReactDOM from 'react-dom';

import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import appReducer      from './reducers';

import App      from './components/App/App';
import TodoList from './containers/TodoList/TodoList';
import TodoItem from './containers/TodoItem/TodoItem';
import NotFound from './components/NotFound/NotFound';

import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import './index.css';


const store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/category"/>
        <Route path="/category(/:id)" component={TodoList}/>
        <Route path="/tasks/:id" component={TodoItem}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
