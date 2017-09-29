
import React from 'react';
import { Route } from 'react-router';

import sizeMe from 'react-sizeme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createUsecases from '../usecases';

import pages from './pages';

sizeMe.enableSSRBehaviour = true;

injectTapEventPlugin();

export default (providers, promiseGroup, store) => { // eslint-disable-line no-unused-vars
  const usecases = createUsecases(providers); // eslint-disable-line no-unused-vars
  return (
    <Route path="/" onChange={(prevState, nextState) => {
      if (nextState.location.action !== 'POP') {
        window.scrollTo(0, 0);
      }
    }}>
      {pages.routes.map(route => route(usecases, store, promiseGroup))}
    </Route>
  );
};
