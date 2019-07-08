import { actionsObjectCreator } from 'core-base-redux';

const prefix = 'theme-handler/';

const rawConstants = [
  {
    name: 'SET_THEME', functionName: 'setTheme', prefix, callback: name => ({ name }),
  },
];

const data = actionsObjectCreator(rawConstants);

export const actions = data.actions; // eslint-disable-line
export const constants = data.constants; // eslint-disable-line
