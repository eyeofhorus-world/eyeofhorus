
export default class AuthPresenter {
  constructor(view, usecases, googleConfig) {
    this.view = view;

    this.usecases = usecases;

    this.googleConfig = googleConfig;

    this.onSerializeUser = this.onSerializeUser.bind(this);
    this.onDeserializeUser = this.onDeserializeUser.bind(this);
    this.onUserSignedIn = this.onUserSignedIn.bind(this);
    this.onUserSignOut = this.onUserSignOut.bind(this);
    this.onPopulateAuthorizationInfo = this.onPopulateAuthorizationInfo.bind(this);
    this.onRejectIfUnauthorized = this.onRejectIfUnauthorized.bind(this);
    this.onAuthorizeBeforeProceeding = this.onAuthorizeBeforeProceeding.bind(this);
  }
  onSerializeUser(deserializedUser, onDone) {
    this.usecases.user.sessionSerialize.serialize(deserializedUser).then(
      (serializedUser) => {
        onDone(null, serializedUser);
      },
      () => {
        onDone(null, null);
      });
  }
  onDeserializeUser(serializedUser, onDone) {
    this.usecases.user.sessionSerialize.deserialize(serializedUser).then(
      (deserializedUser) => {
        onDone({ deserializedUser, shouldResetSession: false });
      },
      () => {
        onDone({ shouldResetSession: true });
      });
  }
  onUserSignedIn(accessToken, refreshToken, profile, onDone) {
    if (profile && profile.emails && profile.emails.length > 0) {
      this.usecases.user.signIn.run(profile.emails[0].value, profile.displayName,
        profile.id, accessToken, refreshToken)
      .then(
        (user) => {
          onDone(null, user);
        },
        (err) => {
          onDone(err, null);
        });
    } else {
      onDone({ message: 'Profile has no useable emails' }, null);
    }
  }
  onUserSignOut(req, res) {
    this.view.destroyAuthSessionCookie(req);
    this.view.redirectHome(req, res);
  }
  onPopulateAuthorizationInfo(isSessionAuthenticated, user, callback) {
    if (isSessionAuthenticated) {
      this.usecases.user.isAuthorized.run(this.googleConfig.clientID, this.googleConfig.clientSecret, user)
      .then(
        ({ authorizedUser }) => {
          callback(authorizedUser);
        },
        () => {
          callback(null);
        });
    } else {
      callback(null);
    }
  }
  onRejectIfUnauthorized(isSessionAuthenticated, user) {
    if (isSessionAuthenticated === true) {
      return this.usecases.user.isAuthorized.run(this.googleConfig.clientID, this.googleConfig.clientSecret, user).then(
        ({ authorizedUser, isAuthorized }) => Promise.resolve({ user: authorizedUser, shouldReject: isAuthorized !== true }),
        error => Promise.reject(error));
    } else {
      return Promise.reject({});
    }
  }
  onAuthorizeBeforeProceeding(user, decision) {
    this.usecases.user.isAuthorized.run(this.google.clientID, this.google.clientSecret, user)
    .then(
      ({ authorizedUser, isAuthorized }) => {
        if (isAuthorized === true) {
          decision({ user: authorizedUser, needsToLogin: false, forceConsent: false });
        } else {
          decision({ user: null, needsToLogin: true, forceConsent: false });
        }
      },
      () => {
        decision({ user: null, needsToLogin: true, forceConsent: true });
      },
    );
  }
}
