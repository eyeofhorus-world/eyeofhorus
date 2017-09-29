
import express from 'express';

import isDevelopmentEnvironment from './config/environment';

import initPort from './modules/port';
import initStatic from './modules/static';
import initCookies from './modules/cookies';
import initBodyParsing from './modules/body-parsing';
import initSession from './modules/session';
import initDatabase from './modules/database';

export default (cookieSecret) => {
  const app = express();

  return initPort(app)
    .then(
      () => {
        if (isDevelopmentEnvironment()) {
          return initStatic(app);
        } else {
          return Promise.resolve({});
        }
      },
      error => Promise.reject(error))
    .then(
      () => initCookies(app),
      error => Promise.reject(error))
    .then(
      () => initBodyParsing(app),
      error => Promise.reject(error))
    .then(
      () => initSession(app, cookieSecret),
      error => Promise.reject(error))
    .then(
      () => initDatabase(),
      error => Promise.reject(error))
    .then(
      () => Promise.resolve({
        app,
        startServing: (module) => {
          if (!module.parent) {
            const server = app.listen(app.get('port'), () => {
              const port = server.address().port;
              console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
            });
          }
        },
      }),
      error => Promise.reject(error));
};
