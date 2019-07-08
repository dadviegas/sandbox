import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

const reducer = (state = 1, { type, payload }) => {
  return state;
};

export default history => combineReducers({
  router: connectRouter(history),
  reducer,
});
