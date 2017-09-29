
import { createAction } from 'redux-actions';

import networkSelectors from './selectors';
import types from './types';

const onDebounceSafetyStart = createAction(types.DEBOUNCE_SAFETY_START, () => ({}));
const onDebounceSafetyEnd = createAction(types.DEBOUNCE_SAFETY_END, () => ({}));

const onNetworkTrouble = (dispatch) => {
  dispatch(onDebounceSafetyStart());
  dispatch(createAction(types.SHOW_NETWORK_WARNING, () => ({
  }))());
  setTimeout(() => {
    dispatch(onDebounceSafetyEnd());
  }, 500);
};

const onHideNetworkTroubleWarning = (dispatch) => {
  dispatch((ignored, getState) => {
    if (networkSelectors.isDialogDebouncing(getState()) !== true) {
      dispatch(createAction(types.HIDE_NETWORK_WARNING, () => ({
      }))());
    }
  });
};

export default {
  onNetworkTrouble,
  onHideNetworkTroubleWarning,
};
