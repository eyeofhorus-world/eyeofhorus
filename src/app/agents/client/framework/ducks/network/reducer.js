
import Immutable from 'immutable';

import types from './types';

const initialState = Immutable.fromJS({
  showNetworkWarning: false,
  isDialogDebouncing: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SHOW_NETWORK_WARNING:
    return state.set('showNetworkWarning', true);
  case types.HIDE_NETWORK_WARNING:
    return state.set('showNetworkWarning', false);

  case types.DEBOUNCE_SAFETY_START:
    return state.set('isDialogDebouncing', true);
  case types.DEBOUNCE_SAFETY_END:
    return state.set('isDialogDebouncing', false);

  default:
    return state;
  }
};
