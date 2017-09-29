
import { combineReducers } from 'redux-immutable';

import user from './user';
import articles from './articles';
import search from './search';
import network from './network';
import userTracking from './user-tracking';

export default combineReducers({
  user,
  articles,
  search,
  network,
  userTracking,
});
