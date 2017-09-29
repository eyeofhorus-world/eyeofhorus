
import Immutable from 'immutable';

import { createSelector } from 'reselect';

import { selectors as searchSelectors } from '../search';

const moduleName = 'userTracking'; // eslint-disable-line no-unused-vars

const trackingContext = createSelector(
  state => (state.get(moduleName) || Immutable.fromJS({})),
  searchSelectors.lastSuccessfulQuery,
  (info, query) => info.set('query', query));

export default {
  trackingContext,
};
