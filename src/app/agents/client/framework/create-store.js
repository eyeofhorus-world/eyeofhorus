
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './ducks';

export default (initialState = Immutable.fromJS({})) => createStore(
  reducers,
  initialState,
  applyMiddleware(thunk));
