import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Main from 'containers/Main/Main';
import reducer from 'modules/product/product';

require('./styles/app.scss');

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);