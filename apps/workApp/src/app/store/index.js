/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { all, fork } from 'redux-saga/effects';

import sagas from '../sagas';
import rootReducer from '../reducers';
import middlewares from '../middlewares';

// eslint-disable-next-line max-len
const flatten = arr => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware({
    onError: error => console.log.error(error),
  });

  const middlewareEnhancer = applyMiddleware(...middlewares, sagaMiddleware);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer,
  );

  let sagaTask = sagaMiddleware.run(function* rootSaga() {
    const flattenSagas = flatten(sagas);
    yield all(flattenSagas.map(fork));
  });

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        // eslint-disable-next-line global-require
        const newRootReducer = require('../reducers').default;
        store.replaceReducer(newRootReducer);
      });

      // eslint-disable-next-line no-undef
      module.hot.accept('../sagas', () => {
        const getNewSagas = require('../sagas').default;
        sagaTask.cancel();
        sagaTask.toPromise.then(() => {
          sagaTask = sagaMiddleware.run(function* replacedSaga() {
            const flattenSagas = flatten(getNewSagas);
            yield all(flattenSagas.map(fork));
          });
        });
      });
    }
  }

  return store;
}
