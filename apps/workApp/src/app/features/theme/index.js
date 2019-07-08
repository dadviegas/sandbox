import { logicCreator } from 'core-base-redux';
import theme from './reducer';

export default logicCreator({
  reducers: { theme },
});

export * from './actions';
export * from './selectors';
