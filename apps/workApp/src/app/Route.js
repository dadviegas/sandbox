import React from 'react';

import { HashRouter as Router, Route, Link } from 'react-router-dom';

import App from '../components/App';

export default () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/theme/">Users</Link>
        </li>
      </ul>
    </nav>
    <Route path="/theme" component={App} />
    <Route path="/about" render={() => (<div>About</div>)} />
    <Route exact path="/" render={() => (<div> Main </div>)} />
  </Router>
);
