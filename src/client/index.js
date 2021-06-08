import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';

import store from './store.js';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)