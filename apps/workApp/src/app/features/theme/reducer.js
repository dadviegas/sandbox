import { constants as theme } from './actions';

const initialState = {
  name: 'two',
};

const map = {
  [theme.set]: (state, payload) => ({
    ...state,
    theme: {
      name: payload.theme,
    },
  }),
}

export default function (state = initialState, { type, payload }) {
  const reducer = map[type];
  return reducer && reducer(state, payload) || state
}
