
import React from 'react';
import { IndexRoute } from 'react-router';

import { actions as searchActions } from '../../../framework/ducks/search';

import View from './view';

const dispatchSearch = (usecases, store, promiseGroup, location) => {
  let query;
  if (location && location.query && location.query.search) {
    query = location.query.search;
  } else {
    query = '';
  }
  searchActions.fetchResults(promiseGroup, store.dispatch, store.getState, usecases, query);
};

export default (usecases, store, promiseGroup) => (
  <IndexRoute key="home" component={View} usecases={usecases} onEnter={(nextState) => {
    const location = nextState ? (nextState.location || {}) : {};
    dispatchSearch(usecases, store, promiseGroup, location);
  }} onPagePropsChanged={(nextState) => {
    const location = nextState ? (nextState.location || {}) : {};
    dispatchSearch(usecases, store, promiseGroup, location);
  }}/>
);
