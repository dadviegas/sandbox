import { logicCreator } from 'core-base-redux';
import theme from './reducer';
import { actions, constants } from './actions';
import * as selectors from './selectors';

const feature = logicCreator({
  selectors,
  actions,
  constants,
  reducers: { theme },
});

export default feature;
