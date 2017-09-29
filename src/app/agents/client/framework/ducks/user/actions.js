
import { createAction } from 'redux-actions';

import { escape } from '../../../../../helpers/string-helpers';

import { selectors as searchSelectors } from '../search';

import userSelectors from './selectors';
import types from './types';

const onDebounceSafetyStart = createAction(types.DEBOUNCE_SAFETY_START, () => ({}));
const onDebounceSafetyEnd = createAction(types.DEBOUNCE_SAFETY_END, () => ({}));

const signedIn = createAction(types.SIGNED_IN, (userId, userEmail, userDisplayName) => ({
  userId,
  userEmail,
  userDisplayName,
}));

const signedOut = createAction(types.SIGNED_OUT, () => ({}));

const wantsToSignIn = (getState) => {
  const query = searchSelectors.query(getState());
  window.location = `/auth/google?search=${escape(query || '')}`; // eslint-disable-line no-param-reassign
  return {};
};

const wantsToSignOut = (getState) => {
  const query = searchSelectors.query(getState());
  window.location = `/auth/logout?search=${escape(query || '')}`; // eslint-disable-line no-param-reassign
  return {};
};

const onShowNeedToSignInWarning = (dispatch) => {
  dispatch(onDebounceSafetyStart());
  dispatch(createAction(types.SHOW_NEED_TO_SIGN_IN_WARNING, () => ({
  }))());
  setTimeout(() => {
    dispatch(onDebounceSafetyEnd());
  }, 500);
};

const onHideNeedToSignInWarning = (dispatch) => {
  dispatch((ignored, getState) => {
    if (userSelectors.isDialogDebouncing(getState()) !== true) {
      dispatch(createAction(types.HIDE_NEED_TO_SIGN_IN_WARNING, () => ({
      }))());
    }
  });
};

const onShowSessionExpiredWarning = (dispatch) => {
  dispatch(onDebounceSafetyStart());
  dispatch(createAction(types.SHOW_SESSION_EXPIRED_WARNING, () => ({
  }))());
  setTimeout(() => {
    dispatch(onDebounceSafetyEnd());
  }, 500);
};

const onHideSessionExpiredWarning = (dispatch) => {
  dispatch((ignored, getState) => {
    if (userSelectors.isDialogDebouncing(getState()) !== true) {
      wantsToSignOut(getState);
    }
  });
};

export default {
  signedIn,
  signedOut,
  
  wantsToSignIn,
  wantsToSignOut,

  onShowNeedToSignInWarning,
  onHideNeedToSignInWarning,
  onShowSessionExpiredWarning,
  onHideSessionExpiredWarning,
};
