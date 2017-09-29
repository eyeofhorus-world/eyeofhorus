
import Immutable from 'immutable';

import types from './types';

const initialState = Immutable.fromJS({
  id: null,
  email: null,
  displayName: null,

  showNeedToSignIn: false,
  showSessionExpired: false,
  isDialogDebouncing: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SIGNED_IN:
    return state
      .set('id', action.payload.userId)
      .set('email', action.payload.userEmail)
      .set('displayName', action.payload.userDisplayName);
  case types.SIGNED_OUT:
    return initialState;


  case types.SHOW_NEED_TO_SIGN_IN_WARNING:
    return state.set('showNeedToSignIn', true);
  case types.HIDE_NEED_TO_SIGN_IN_WARNING:
    return state.set('showNeedToSignIn', false);
  case types.SHOW_SESSION_EXPIRED_WARNING:
    return state.set('showSessionExpired', true);
  case types.HIDE_SESSION_EXPIRED_WARNING:
    return state.set('showSessionExpired', true);

  case types.DEBOUNCE_SAFETY_START:
    return state.set('isDialogDebouncing', true);
  case types.DEBOUNCE_SAFETY_END:
    return state.set('isDialogDebouncing', false);

  default:
    return state;
  }
};
