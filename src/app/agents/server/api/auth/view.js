
import passport from 'passport';
import { series } from 'middleware-flow';
import { ensureLoggedIn } from 'connect-ensure-login';

import { escape } from '../../../../helpers/string-helpers';

import isDevelopmentEnvironment, { isStagingEnvironment } from '../../framework/config/environment';

import selectors from '../selectors';

import AuthPresenter from './presenter';

const finishRedirectUrl = (googleConfig) => {
  if (isStagingEnvironment() === true) {
    return googleConfig.finishRedirectUrl.stagingHost;
  } else if (isDevelopmentEnvironment() === true) {
    return googleConfig.finishRedirectUrl.localHost;
  } else {
    return googleConfig.finishRedirectUrl.publicHost;
  }
};

export default class AuthView {
  constructor(usecases, commonApi, logInUrl, googleConfig) {
    this.commonApi = commonApi;
    this.logInUrl = logInUrl;
    this.googleConfig = googleConfig;

    this.authPresenter = new AuthPresenter(
      this, usecases, googleConfig);

    this.serializeUser = this.serializeUser.bind(this);
    this.deserializeUser = this.deserializeUser.bind(this);
    this.onUserSignedIn = this.onUserSignedIn.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInCallback = this.signInCallback.bind(this);
    this.signOut = this.signOut.bind(this);
    this.destroyAuthSessionCookie = this.destroyAuthSessionCookie.bind(this);
    this.redirectHomeFromSignIn = this.redirectHomeFromSignIn.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
    this.populateAuthorizationInfo = this.populateAuthorizationInfo.bind(this);
    this.rejectIfUnauthorized = this.rejectIfUnauthorized.bind(this);
    this.authorizeBeforeProceeding = this.authorizeBeforeProceeding.bind(this);
  }
  serializeUser(deserializedUser, onDone) {
    this.authPresenter.onSerializeUser(deserializedUser, onDone);
  }
  deserializeUser(serializedUser, onDone) {
    this.authPresenter.onDeserializeUser(serializedUser,
      ({ deserializedUser, shouldResetSession }) => {
        if (shouldResetSession === true) {
          // false will reset the session on the cookie
          onDone(null, false);
        } else {
          onDone(null, deserializedUser);
        }
      });
  }
  onUserSignedIn(accessToken, refreshToken, profile, onDone) {
    this.authPresenter.onUserSignedIn(accessToken, refreshToken, profile, onDone);
  }
  signIn() {
    return series(this.populateAuthorizationInfo(), (req, res, next) => {
      selectors.req.session.setRedirectSearchQuery(req, escape(selectors.req.query.search(req) || ''));
      if (selectors.req.session.forceConsent(req) === true) {
        passport.authenticate('google', {
          scope: ['email', 'profile'],
          accessType: 'offline',
          prompt: 'consent',
        })(req, res, next);
      } else {
        passport.authenticate('google', {
          scope: ['email', 'profile'],
          accessType: 'offline',
        })(req, res, next);
      }
    }, (err, req, res, next) => {
      selectors.req.session.setForceConsent(req, true);
      next();
    });
  }
  signInCallback() {
    const self = this;
    return series(passport.authenticate('google', {
      failureRedirect: '/',
    }), (req, res) => {
      self.redirectHomeFromSignIn(req, res);
    });
  }
  signOut() {
    const self = this;
    return (req, res) => {
      self.authPresenter.onUserSignOut(req, res);
    };
  }
  rejectIfUnauthorized() {
    const self = this;
    return (req, res, next) => {
      self.authPresenter.onRejectIfUnauthorized(
        selectors.req.isAuthenticated(req), 
        selectors.req.user.get(req))
      .then(
        ({ user, shouldReject }) => {
          if (shouldReject === true) {
            return Promise.reject({});
          } else {
            return Promise.resolve(user);
          }
        },
        error => Promise.reject(error))
      .then(
        (user) => {
          selectors.req.user.set(req, user);
          next();
        },
        (error) => {
          self.commonApi.notAuthorized(res, error);
        });
    };
  }
  authorizeBeforeProceeding() {
    const self = this;
    return series(ensureLoggedIn(self.logInUrl), (req, res, next) => {
      self.authPresenter.onAuthorizeBeforeProceeding(req.user, ({ user, needsToLogin, forceConsent }) => {
        selectors.req.session.setForceConsent(req, !!forceConsent);
        if (needsToLogin) {
          selectors.req.user.set(req, null);
          if (selectors.req.session.exists(req) === true) {
            selectors.req.session.setReturnTo(req, selectors.req.originalUrl(req));
          }
          this.commonApi.redirect(res, self.logInUrl);
        } else {
          selectors.req.user.set(req, user);
          next();
        }
      });
    });
  }
  populateAuthorizationInfo() {
    const self = this;
    return (req, res, next) => {
      self.authPresenter.onPopulateAuthorizationInfo(
        selectors.req.isAuthenticated(req), 
        selectors.req.user.get(req),
        (user) => {
          selectors.req.user.set(req, user);
          next();
        });
    };
  }
  destroyAuthSessionCookie(req) {
    selectors.req.logout(req);
    selectors.req.session.reset(req);
  }
  redirectHomeFromSignIn(req, res) {
    const redirectSearchQuery = selectors.req.session.getRedirectSearchQuery(req);
    this.commonApi.redirect(res, `${finishRedirectUrl(this.googleConfig)}?search=${redirectSearchQuery}`);
  }
  redirectHome(req, res) {
    const redirectSearchQuery = escape(selectors.req.query.search(req) || '');
    this.commonApi.redirect(res, `${finishRedirectUrl(this.googleConfig)}?search=${redirectSearchQuery}`);
  }
}
