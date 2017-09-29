/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';

import { init as parseCommandLine } from './framework/config/commands';
import createServer from './framework/create-server';
import Scheduler from './framework/scheduler';

import googleConfig from './framework/config/google';

import installApi from './api';

parseCommandLine();

new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, '../../../../../meyve/googleSecrets.json'), 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(data));
    }
  });
}).then(google => new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, '../../../../../meyve/cookieSecrets.json'), 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(Object.assign({}, { google }, { cookie: JSON.parse(data) }));
    }
  });
})).then(secrets => createServer(secrets.cookie.secret).then(value => Promise.resolve(Object.assign({}, value, { secrets })))).then(
  ({ app, startServing, secrets }) => {
    const jobs = new Scheduler();
    installApi(Object.assign({}, googleConfig, secrets.google), app, jobs);

    jobs.periodic(1 * 60 * 1000, (error) => {
      console.log(`jobs-error: ${JSON.stringify(error)}`); // eslint-disable-line no-console
    });
    
    startServing(module);
  },
  error => Promise.reject({
    errorStarting: error,
  }))
  .then(
  () => {
  },
  (error) => {
    if (error && error.errorStarting) {
      console.log(`Error starting server: ${JSON.stringify(error)}`); 
    } else {
      console.log(`Runtime error: ${JSON.stringify({ 
        message: error.message || 'Unknown Runtime Error',
        stack: error.stack || '', 
      })}`);
    }
  });
