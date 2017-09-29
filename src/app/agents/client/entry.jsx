
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Immutable from 'immutable';
import { Provider } from 'react-redux';

import UninterestedPromiseGroup from '../../utilities/uninterested-promise-group';

import createStore from './framework/create-store';

import providers from './providers';
import appRoutes from './ui';

const store = createStore(Immutable.fromJS(
  window.__PRELOADED_STATE__)); // eslint-disable-line no-underscore-dangle

const routes = appRoutes(providers, new UninterestedPromiseGroup(), store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.app'));
