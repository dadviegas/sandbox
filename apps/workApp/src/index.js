import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Route from './app/Route';
import store from './app/store';

import '../styles/main.scss';

// eslint-disable-next-line no-undef
const node = elementId => window.document.getElementById(elementId);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Route />
    </Provider>,
    node('root'),
  );
};

if (module.hot) {
  // Support hot reloading of components.
  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('./app/Route', () => {
    setTimeout(render);
  });
}

render();
