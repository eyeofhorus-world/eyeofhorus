
import cookieSession from 'cookie-session';

import isDevelopmentEnvironment, { isStagingEnvironment } from '../config/environment';

export default app => new Promise((resolve) => {
  const options = {
    name: 'session',
    keys: ['eyeofhorus-156814'],
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (isDevelopmentEnvironment() !== true &&
      isStagingEnvironment() !== true) {
    app.set('trust proxy', 1);
    options.secure = true;
  }

  app.use(cookieSession(options));

  resolve({});
});
