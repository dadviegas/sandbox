import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import { history } from './store';
import Home from '../pages/Home';

export default () => (
  <ConnectedRouter history={history}>
    <>
      <Switch>
        <Route path="/theme" component={Home} />
        <Route path="/about" component={Home} />
        <Route exact path="/" component={Home} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </>
  </ConnectedRouter>
);
