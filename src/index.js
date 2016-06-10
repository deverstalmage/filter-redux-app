import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Main from 'containers/Main/Main';
import product from 'modules/product/product';
import filter from 'modules/filter/filter';

require('./styles/app.scss');

const store = createStore(combineReducers({ filter, product }));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);