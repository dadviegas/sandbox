import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from './store';
import Home from '../pages/Home';
import Splash from '../pages/Splash';
import Unavailable from '../pages/Unavailable';

import Main from '../masterPage/Main';

const App = (props) => {
  const locationKey = props.location.pathname

  return (
    <Main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={Home} />
        <Route exact path="/" component={Splash} />
        <Route component={Unavailable} />
      </Switch>
    </Main>
  )
}

export default () => (
  <ConnectedRouter history={history}>
    <Route path="/" component={App} />
  </ConnectedRouter>
);
