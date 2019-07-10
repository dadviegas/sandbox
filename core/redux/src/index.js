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

// runSaga is middleware.run function
// rootSaga is a your root saga for static saagas
function createSagaInjector(runSaga, rootSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = key => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
      // We won't run saga if it is already injected
      if (isInjected(key)) return;

      // Sagas return task when they executed, which can be used
      // to cancel them
      const task = runSaga(saga);

      // Save the task if we want to cancel it in the future
      injectedSagas.set(key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga('root', rootSaga);

  return injectSaga;
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

  store.asyncReducers = {};
  store.staticReducers = reducers;

  // https://manukyan.dev/posts/2019-04-15-code-splitting-for-redux-and-optional-redux-saga/
  store.injectSaga = createSagaInjector(sagaMiddleware.run, function* rootSaga() {
    const flattenSagas = flatten(sagas);
    yield all(flattenSagas.map(fork));
  });

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(combineReducers({
      ...store.staticReducers,
      ...store.asyncReducers,
    }));
  };

  if (module.hot) {
    store.replaceLogic = (elements) => {
      const { reducers, sagas = []} = storeInit(elements, history);
      store.replaceReducer(combineReducers(
        ...store.staticReducers,
        ...store.asyncReducers,
      ));
    }
  }

  return store;
}
