import { actionsObjectCreator } from 'core-base-redux';

const prefix = 'theme/';

const rawConstants = [
  {
    name: 'set', functionName: 'set', prefix, callback: name => ({ name }),
  },
];

const data = actionsObjectCreator(rawConstants);

export const actions = data.actions; // eslint-disable-line
export const constants = data.constants; // eslint-disable-line
