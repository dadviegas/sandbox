import { constants } from './actions';

const initialState = {
  name: 'three',
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case constants.SET_THEME: {
      return {
        ...state,
        theme: {
          name: payload.theme,
        },
      };
    }
    default:
      return state;
  }
}
