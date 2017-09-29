
import Immutable from 'immutable';
import { createAction } from 'redux-actions';

import UninterestedPromiseGroup from '../../../../../utilities/uninterested-promise-group';

import { escape } from '../../../../../helpers/string-helpers';

import { selectors as articlesSelectors, internalActions as articlesInternalActions } from '../articles';
import { selectors as userSelectors } from '../user';
import { actions as userTrackingActions } from '../user-tracking';

import types from './types';
import searchSelectors from './selectors';


const onQueryValidationInProgress = createAction(types.QUERY_VALIDATION_IN_PROGRESS, query => ({
  query,
}));

const onQueryValid = createAction(types.QUERY_VALID, validatedQuery => ({
  query: validatedQuery,
}));

const onQueryInvalid = createAction(types.QUERY_INVALID, errors => ({
  errors,
}));

const queryValidate = (dispatch, getState, usecases, value) => {
  if (value !== searchSelectors.query(getState())) {
    dispatch(onQueryValidationInProgress());
    return usecases.search.validation.query.run(value)
    .then(
      ({ invalidReasons, validatedQuery }) => Promise.resolve({ invalidReasons, validatedQuery }),
      () => Promise.resolve({
        invalidReasons: Immutable.fromJS([
          usecases.search.validation.query.reasonTypes.NEEDS_TO_HAVE_CONTENT,
        ]),
      }))
    .then(
      ({ invalidReasons, validatedQuery }) => {
        if (invalidReasons && invalidReasons.size > 0) {
          dispatch(onQueryInvalid(invalidReasons));
        } else {
          dispatch(onQueryValid(validatedQuery));
        }
      });
  }
  return Promise.resolve({});
};

const onQueryChanged = (dispatch, getState, usecases, value) => {
  dispatch(() => {
    queryValidate(dispatch, getState, usecases, value);
  });
};


const searchInProgress = createAction(types.IN_PROGRESS, query => ({
  query,
}));

const searchSuccessful = createAction(types.SUCCESS, query => ({
  query,
}));

const searchFailed = createAction(types.FAILED, query => ({
  query,
}));

const fetchResults = (promiseGroup, dispatch, getState, usecases, value) => {
  (promiseGroup || new UninterestedPromiseGroup()).add(
    new Promise((resolve) => {
      dispatch(() => {
        resolve(queryValidate(dispatch, getState, usecases, value));
      });
    })
    .then(() => new Promise((resolve) => {
      dispatch(() => {
        if (searchSelectors.shouldSearchQuery(getState()) === true) {
          const query = searchSelectors.query(getState());
          dispatch(searchInProgress(query));
          dispatch(articlesInternalActions.onLoading());
          dispatch(userTrackingActions.onNewSearch());
    
          const numberOfItemsToSkip = 0;
          const viewingAsUserId = userSelectors.id(getState());
          usecases.search.run(query, numberOfItemsToSkip, viewingAsUserId).then(
            ({ articles, isThereMore }) => {
              dispatch(searchSuccessful(query));
              dispatch(articlesInternalActions.onLoadingSuccess(articles, isThereMore));
              resolve({});
            },
            () => {
              dispatch(searchFailed());
              dispatch(articlesInternalActions.onLoadingFailed());
              resolve({});
            });
        } else if (searchSelectors.isQueryMeaningMostRecent(getState()) === true) {
          const query = searchSelectors.query(getState());
          dispatch(searchInProgress(query));
          dispatch(articlesInternalActions.onLoading());
          dispatch(userTrackingActions.onNewSearch());
          
          const viewingAsUserId = userSelectors.id(getState());
          usecases.search.mostRecent.run(viewingAsUserId).then(
            ({ articles, isThereMore }) => {
              dispatch(searchSuccessful(query));
              dispatch(articlesInternalActions.onLoadingSuccess(articles, isThereMore));
              resolve({});
            },
            () => {
              dispatch(searchSuccessful(query));
              dispatch(articlesInternalActions.onLoadingSuccess(Immutable.fromJS([]), false));
              resolve({});
            });
        } else {
          resolve({});
        }
      });
    })));
};

const onSearch = (dispatch, getState, usecases, router) => {
  dispatch(() => {
    if (searchSelectors.canSearchQuery(getState()) === true) {
      const query = searchSelectors.query(getState());
      router.push(`/?search=${escape(query || '')}`);
    }
  });
};

const onShowMore = (dispatch, getState, usecases) => {
  const query = searchSelectors.query(getState());
  dispatch(searchInProgress(query));
  dispatch(articlesInternalActions.onMoreLoading());

  const numberOfItemsToSkip = articlesSelectors.valuesCount(getState());

  const viewingAsUserId = userSelectors.id(getState());
  usecases.search.run(query, numberOfItemsToSkip, viewingAsUserId).then(
    ({ articles, isThereMore }) => {
      dispatch(searchSuccessful(query));
      dispatch(articlesInternalActions.onMoreLoadingSuccess(articles, isThereMore));
    },
    () => {
      dispatch(searchSuccessful(query));
      dispatch(articlesInternalActions.onMoreLoadingFailed());
    });
};

export default {
  fetchResults,
  onSearch,
  onQueryChanged,
  onShowMore,
};
