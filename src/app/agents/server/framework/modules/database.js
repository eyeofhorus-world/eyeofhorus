/* eslint-disable no-console */

import mongoose from 'mongoose';
import { formatMongoose } from 'mongodb-uri';

import { isStagingEnvironment } from '../config/environment';

export default () => new Promise((resolve, reject) => {
  let hasCallbackBeenCalledMemory = false;
  const callbackGuard = (error) => {
    const hasCallbackBeenCalled = hasCallbackBeenCalledMemory;
    hasCallbackBeenCalledMemory = true;
    if (!hasCallbackBeenCalled) {
      if (error) {
        reject(error);
      } else {
        resolve({});
      }
    }
  };

  let uri;
  if (isStagingEnvironment() === true) {
    uri = 'mongodb://127.0.0.1:27017/eyeofhorusstaging';
  } else {
    uri = 'mongodb://127.0.0.1:27017/eyeofhorus';
  }

  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
      },
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
      },
    },
  };
  
  mongoose.connect(
        formatMongoose(uri),
        options,
        (error) => {
          callbackGuard(error);
        });
  mongoose.connection.once('open', () => {
    callbackGuard();
  });
});
