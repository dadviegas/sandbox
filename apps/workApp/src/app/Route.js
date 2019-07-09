import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from './store';

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import Home from '../pages/Home';
import Splash from '../pages/Splash';
import Unavailable from '../pages/Unavailable';

import Main from '../masterPage/Main';

export default ({ routes }) => (
  <ConnectedRouter history={history}>
    <Main>
      <Route
          render={({ location }) => {
            const { pathname } = location;
            return (
              <TransitionGroup>
                <CSSTransition
                  key={pathname}
                  classNames="page"
                  timeout={{
                    enter: 2000,
                    exit: 1000,
                  }}
                >
                  <Route
                    location={location}
                    render={() => (
                      <Switch>
                        {
                          routes.map((route) => {
                            const { key, path, Component, props = {} } = route;
                            return <Route key={key} component={Component} {...props}/>
                          })
                        }
                      </Switch>
                    )}
                  />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
    </Main>
  </ConnectedRouter>
);
