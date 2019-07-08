import { logicCreator } from 'core-base-redux';
import theme from './reducer';
import { actions, constants } from './actions';
import * as selectors from './selectors';

export default logicCreator({
  selectors,
  actions,
  constants,
  reducers: { theme },
});
