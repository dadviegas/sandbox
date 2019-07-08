import isPlainObject from 'is-plain-object';

export const logicCreator = ({
  reducers = {},
  sagas = [],
  middlewares = [],
}) => ({
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

const createActions = (rawConstants) => {
  const actions = {};

  rawConstants.forEach((action) => {
    const constant = addPrefixAction(action);
    // eslint-disable-next-line max-len
    actions[action.functionName] = (payload = {}) => ({ type: constant, payload: action.callback ? action.callback(payload) : payload });
  });

  return actions;
};

const createConstants = (rawConstants) => {
  const constants = {};

  rawConstants.forEach((action) => {
    const constant = addPrefixAction(action);
    constants[action.name] = constant;
  });

  return constants;
};

export const actionsObjectCreator = actions => ({
  actions: createActions(actions),
  constants: createConstants(actions),
});
