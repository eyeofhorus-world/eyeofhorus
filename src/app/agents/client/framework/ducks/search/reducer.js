
import Immutable from 'immutable';

import types from './types';

const initialState = Immutable.fromJS({
  inProgress: false,
  canRetry: false,
  lastSuccessfulQuery: null,
  lastQuery: null,

  query: null,
  queryValidationInProgress: false,
  queryIsValid: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.QUERY_VALIDATION_IN_PROGRESS:
    return state
      .set('queryValidationInProgress', true)
      .set('queryIsValid', false)
      .set('query', action.payload.query || '')
      .set('canRetry', false);
  case types.QUERY_VALID:
    return state
      .set('queryValidationInProgress', false)
      .set('queryIsValid', true)
      .set('query', action.payload.query || '');
  case types.QUERY_INVALID:
    return state
      .set('queryValidationInProgress', false)
      .set('queryIsValid', false);

  case types.IN_PROGRESS:
    return state.set('inProgress', true)
      .set('lastQuery', action.payload.query);
  case types.SUCCESS:
    return state
      .set('inProgress', false)
      .set('lastSuccessfulQuery', action.payload.query)
      .set('canRetry', false);
  case types.FAILED:
    return state.set('inProgress', false)
      .set('lastSuccessfulQuery', null)
      .set('canRetry', true);

  default:
    return state;
  }
};
