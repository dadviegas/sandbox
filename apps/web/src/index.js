import React from 'react';
import ReactDOM from 'react-dom';

import Route from './components/Route';

import '../styles/core.scss';

// eslint-disable-next-line no-undef
const node = elementId => window.document.getElementById(elementId);

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    node('root'),
  );
};

if (module.hot) {
  module.hot.accept();
}

render(Route);
