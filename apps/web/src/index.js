import React from 'react';
import ReactDOM from 'react-dom';
import Middleware from 'asgard-middleware';

import App from './components/Main/App';

const middleware = new Middleware();
middleware.run(() => console.log(1))
// eslint-disable-next-line no-undef
const wrapper = window.document.getElementById('root');

ReactDOM.render(<App />, wrapper);
