import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Main from 'containers/Main/Main';
import product from 'modules/product/product';
import filter from 'modules/filter/filter';

require('./styles/app.scss');

const store = applyMiddleware(thunk)(createStore)(combineReducers({ filter, product }));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);