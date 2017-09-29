
import Immutable from 'immutable';

import types from './types';

const initialState = Immutable.fromJS({
  userActionsSinceLastSearch: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.ON_NEW_SEARCH:
    return state.set('userActionsSinceLastSearch', 0);

  case types.ON_ADDED_ATTRIBUTE:
    return state.set('userActionsSinceLastSearch', state.get('userActionsSinceLastSearch') + 1);
  case types.ON_VOTED_UP:
    return state.set('userActionsSinceLastSearch', state.get('userActionsSinceLastSearch') + 1);
  case types.ON_VOTED_DOWN:
    return state.set('userActionsSinceLastSearch', state.get('userActionsSinceLastSearch') + 1);
  case types.ON_SHOWN_MORE_ATTRIBUTES:
    return state.set('userActionsSinceLastSearch', state.get('userActionsSinceLastSearch') + 1);

  default:
    return state;
  }
};
