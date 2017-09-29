
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import PromiseGroup from '../../../../utilities/promise-group';

import appRoutes from '../../ui';

import createStore from '../create-store';

import { render } from './browser';

const reactComponent = (renderProps, store) => (
  <Provider store={store}>
    <RouterContext {...renderProps} />
  </Provider>
);

const waitForStoreToSettle = store => new Promise((resolve) => {
  store.dispatch(() => {
    resolve();
  });
});

export default (url, { providers, appWillMount, appRendered }) => {
  const promiseGroup = new PromiseGroup();
  const store = createStore();

  appWillMount(promiseGroup, store);

  waitForStoreToSettle(store)
  .then(() => promiseGroup.finishAll({ unbox: false, noreject: false }), () => Promise.reject({}))
  .then(() => waitForStoreToSettle(store), () => Promise.reject({}))
  .then(
    () => new Promise((resolve, reject) => {
      match({ routes: appRoutes(providers, promiseGroup, store), location: url }, (error, redirectLocation, renderProps) => { // eslint-disable-line max-len
        if (redirectLocation) {
          resolve({ redirectLocation });
        } else if (error) {
          reject(error);
        } else if (renderProps) {
          waitForStoreToSettle(store)
          .then(
            () => promiseGroup.finishAll({ unbox: false, noreject: false }),
            innerError => Promise.reject(innerError))
          .then(
            () => waitForStoreToSettle(store),
            innerError => Promise.reject(innerError))
          .then(
            () => resolve({ redirectLocation, renderProps }),
            innerError => reject(innerError));
        } else {
          resolve({});
        }
      });
    }),
    error => Promise.reject({ error }))
  .then(
    ({ redirectLocation, renderProps }) => {
      if (!redirectLocation && renderProps) {
        const renderedApp = render(ReactDOMServer.renderToString(
          reactComponent(renderProps, store)), store.getState());
        return Promise.resolve({ redirectLocation, renderedApp });
      } else {
        return Promise.resolve({ redirectLocation });
      }
    },
    error => Promise.reject(error))
  .then(
    ({ redirectLocation, renderedApp }) => {
      if (redirectLocation) {
        appRendered(null, redirectLocation);
      } else if (renderedApp) {
        appRendered(null, null, renderedApp);
      } else {
        appRendered(null, null, null, 'Not found');
      }
    },
    (error) => {
      appRendered({
        error: {
          message: error.message || 'Unknown Server Error',
          stack: error.stack || '',
        },
      });
    });
};
