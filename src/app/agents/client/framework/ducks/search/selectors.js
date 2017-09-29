
import Immutable from 'immutable'; // eslint-disable-line no-unused-vars
import { createSelector } from 'reselect';

const moduleName = 'search';

const inProgress = state => (state.getIn([moduleName, 'inProgress']) === true);
const canRetry = state => (state.getIn([moduleName, 'canRetry']) === true);

const lastSuccessfulQuery = state => (state.getIn([moduleName, 'lastSuccessfulQuery']));
const lastQuery = state => (state.getIn([moduleName, 'lastQuery']));

const query = state => (state.getIn([moduleName, 'query']) || '');

const isQueryValidationInProgress = state => (state.getIn([moduleName, 'queryValidationInProgress']) === true);
const queryIsValid = state => (state.getIn([moduleName, 'queryIsValid']) === true);

const canSearchQuery = createSelector(
  inProgress,
  isQueryValidationInProgress,
  queryIsValid,
  (progress, validationInProgress, queryValid) => (
    progress !== true && validationInProgress !== true && queryValid === true));

const shouldSearchQuery = createSelector(
  inProgress,
  isQueryValidationInProgress,
  queryIsValid,
  canRetry,
  lastSuccessfulQuery,
  query,
  (isInProgress, isQueryValidating, isQueryValid, canQueryBeRetried, theLastSuccessfulQuery, theQuery) => (
    isInProgress !== true &&
    isQueryValidating !== true &&
    isQueryValid === true &&
    (canQueryBeRetried === true || !theLastSuccessfulQuery || theQuery !== theLastSuccessfulQuery)));

const isQueryMeaningMostRecent = createSelector(
  inProgress,
  isQueryValidationInProgress,
  query,
  (isInProgress, isQueryValidating, theQuery) => (
    isInProgress !== true &&
    isQueryValidating !== true &&
    (!theQuery || theQuery.length === 0)));

const isShowingMostRecent = createSelector(
  inProgress,
  isQueryValidationInProgress,
  lastSuccessfulQuery,
  (isInProgress, isQueryValidating, theQuery) => (
    isInProgress !== true &&
    isQueryValidating !== true &&
    (!theQuery || theQuery.length === 0)));

export default {
  inProgress,
  canRetry,
  lastSuccessfulQuery,
  lastQuery,

  query,
  isQueryValidationInProgress,
  canSearchQuery,
  shouldSearchQuery,
  isQueryMeaningMostRecent,
  isShowingMostRecent,
};
