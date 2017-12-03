import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import appReducer from './reducers';
import App from './components/App/App';

import './index.css';


const middleware = [];

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(...middleware)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
