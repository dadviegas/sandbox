import configureStore from 'core-base-redux';
import { createHashHistory } from 'history';
import logic from './logic';

export const history = createHashHistory();

const store = configureStore({}, logic, history)

if (module.hot) {
  module.hot.accept([
    './logic',
  ], () => store.replaceLogic(require('./logic').default));
}

export default store;