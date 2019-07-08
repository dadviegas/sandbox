import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from './store';

import App from '../components/App';

export default () => (
  <ConnectedRouter history={history}>
    <>
      {/* <nav>
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
      </nav> */}
      <Switch>
        <Route path="/theme" component={App} />
        <Route path="/about" render={() => (<div>About</div>)} />
        <Route exact path="/" render={() => (<div> Main </div>)} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </>
  </ConnectedRouter>
);
