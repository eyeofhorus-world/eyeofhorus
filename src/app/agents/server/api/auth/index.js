
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import isDevelopmentEnvironment, { isStagingEnvironment } from '../../framework/config/environment';

import AuthView from './view';

const googleCallbackUrl = (googleConfig) => {
  if (isStagingEnvironment() === true) {
    return googleConfig.callbackUrl.stagingHost;
  } else if (isDevelopmentEnvironment() === true) {
    return googleConfig.callbackUrl.localHost;
  } else {
    return googleConfig.callbackUrl.publicHost;
  }
};

export default (googleConfig, app, usecases, commonApi) => {
  const view = new AuthView(
      usecases,
      commonApi,
      '/auth/google',
      googleConfig);
  
  const googleAuthConfig = {
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleCallbackUrl(googleConfig),
  };
  
  passport.serializeUser(view.serializeUser);
  passport.deserializeUser(view.deserializeUser);
  passport.use(new GoogleStrategy(googleAuthConfig, view.onUserSignedIn));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', view.signIn());
  app.get('/auth/google/callback', view.signInCallback());
  app.get('/auth/logout', view.signOut());

  return ({
    populateAuthorizationInfo: view.populateAuthorizationInfo(),
    authorizeBeforeProceeding: view.authorizeBeforeProceeding(),
    rejectIfUnauthorized: view.rejectIfUnauthorized(),
  });
};
