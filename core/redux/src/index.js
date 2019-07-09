import isPlainObject from 'is-plain-object';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { all, fork } from 'redux-saga/effects';

export const logicCreator = ({
  selectors = {},
  actions = {},
  constants = {},
  reducers = {},
  sagas = [],
  middlewares = [],
}) => ({
  selectors,
  actions,
  constants,
  reducers,
  sagas,
  middlewares,
});

const identity = t => t;

export const payloadError = type => new Error(`${type} - final payload must be a plain object, error or undefined`);
export const actionTypeError = () => new Error('Action Type must be a string');
export const actionPayloadError = () => new Error('Action Payload creator must be a function');

export function actionCreator(type, payloadCreator = identity) {
  if (typeof payloadCreator !== 'function') {
    throw actionPayloadError();
  }

  if (typeof type !== 'string') {
    throw actionTypeError();
  }

  return (...args) => {
    const action = {
      type,
    };

    const payload = payloadCreator(...args);

    if (payload !== undefined) {
      if (isPlainObject(payload) || payload instanceof Error) {
        action.payload = payload;
      } else {
        // console.warn(payloadError(type));

        action.payload = {};
      }
    }

    // decomment to debug actions
    // console.log(action);

    return action;
  };
}

const addPrefixAction = ({ name, prefix = '' }) => (`${prefix}${name}`);

export const actionsObjectCreator = (rawConstants) => {
  const actions = {};
  const constants = {};

  rawConstants.forEach((action) => {
    const constant = addPrefixAction(action);
    // eslint-disable-next-line max-len
    actions[action.functionName] = (payload = {}) => ({ type: constant, payload: action.callback ? action.callback(payload) : payload });
    constants[action.name] = constant;
  });

  return { actions, constants };
};

// eslint-disable-next-line max-len
const flatten = arr => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

export const storeInit = (elements = [], history) => {
  const storeOptions = {
    reducers: {},
    sagas: [],
    middlewares: [routerMiddleware(history)],
  };

  elements.forEach(element => {
    storeOptions.reducers = {
      ...storeOptions.reducers,
      ...element.reducers,
      router: connectRouter(history)
    };

    storeOptions.sagas = storeOptions.sagas.concat(element.sagas);
    storeOptions.middlewares = storeOptions.middlewares.concat(element.middlewares);
  });

  return storeOptions;
}

export default function configureStore(preloadedState = {}, elements, history) {
  const { reducers, sagas = [], middlewares = []} = storeInit(elements, history);

  const sagaMiddleware = createSagaMiddleware({
    // eslint-disable-next-line no-console
    onError: error => console.log.error(error),
  });

  const middlewareEnhancer = applyMiddleware(
    routerMiddleware(history),
    ...middlewares,
    sagaMiddleware,
  );

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(
    combineReducers(
      reducers
    ),
    preloadedState,
    composedEnhancer,
  );

  let sagaTask = sagaMiddleware.run(function* rootSaga() {
    const flattenSagas = flatten(sagas);
    yield all(flattenSagas.map(fork));
  });

  if (module.hot) {
    store.replaceLogic = (elements) => {
      const { reducers, sagas = []} = storeInit(elements, history);
      store.replaceReducer(combineReducers(
        reducers
      ));

      if (sagas.length) {
        sagaTask.cancel();
        sagaTask.toPromise.then(() => {
          sagaTask = sagaMiddleware.run(function* replacedSaga() {
            const flattenSagas = flatten(sagas);
            yield all(flattenSagas.map(fork));
          });
        });
      }
    }
  }

  return store;
}
