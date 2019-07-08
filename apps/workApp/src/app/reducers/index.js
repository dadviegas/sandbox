import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { theme } from '../index';

export default history => combineReducers({
  router: connectRouter(history),
  ...theme.reducers,
});
