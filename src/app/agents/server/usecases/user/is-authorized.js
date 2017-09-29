
export default class IsUserAuthorizedUsecase {
  constructor(userProvider, idTokenProvider, refreshedAccessTokenProvider) {
    this.userProvider = userProvider;
    this.idTokenProvider = idTokenProvider;
    this.refreshedAccessTokenProvider = refreshedAccessTokenProvider;

    this.run = this.run.bind(this);
    this.isIdTokenValid = this.isIdTokenValid.bind(this);
    this.isIdTokenExpired = this.isIdTokenExpired.bind(this);
    this.isUnAuthorizedError = this.isUnAuthorizedError.bind(this);
    this.fetchIdToken = this.fetchIdToken.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
  }

  run(googleClientId, googleClientSecret, user) {
    if (!user) {
      return Promise.resolve({ 
        user: null, 
        isAuthorized: false,
      });
    } else if (!user.ticket) {
      return Promise.resolve({ 
        user, 
        isAuthorized: false,
      });
    }

    const self = this;
    return self.fetchIdToken(googleClientId, googleClientSecret,
      user.ticket.accessToken, user.ticket.refreshToken)
    .then(
      ({ accessToken, idToken }) => {
        if (user && user.email && user.ticket) {
          return self.userProvider.mutateAccessToken(user, accessToken).then(
            modifiedUser => Promise.resolve({ accessToken, idToken, modifiedUser }),
            error => Promise.reject(error));
        } else {
          return Promise.reject({ error: null });
        }
      },
      error => Promise.reject(error))
    .then(
      ({ accessToken, idToken, modifiedUser }) => {
        if (accessToken) {
          const isIdTokenValid = self.isIdTokenValid(
            googleClientId, modifiedUser.email, idToken) === true;
          return Promise.resolve({ 
            authorizedUser: modifiedUser, 
            isAuthorized: (modifiedUser && isIdTokenValid),
          });
        } else {
          return Promise.reject({ error: null });
        }
      },
      error => Promise.reject(error));
  }

  isIdTokenValid(googleClientId, userEmail, idToken) {
    return (
      idToken &&
      idToken.email === userEmail &&
      idToken.azp === googleClientId &&
      idToken.aud === googleClientId
    );
  }

  isIdTokenExpired(idToken) {
    return (
      ({}).hasOwnProperty.call(idToken, 'expires_in') !== true ||
      idToken.expires_in === 0
    );
  }

  isUnAuthorizedError(err) {
    return (
      err && err.statusCode >= 400 && err.statusCode < 500
    );
  }

  fetchIdToken(googleClientId, googleClientSecret, accessToken, refreshToken) {
    if (!accessToken && !refreshToken) {
      return Promise.resolve({ accessToken: null, idToken: null });
    }
    const self = this;
    return self.idTokenProvider(accessToken)
    .then(
      idToken => Promise.resolve({
        idToken,
        needsToRefreshAccessToken: self.isIdTokenExpired(idToken),
        error: null,
      }),
      error => Promise.resolve({
        idToken: null,
        needsToRefreshAccessToken: self.isUnAuthorizedError(error),
        error,
      }))
    .then(
      ({ idToken, needsToRefreshAccessToken, error }) => {
        if (needsToRefreshAccessToken) {
          return self.refreshAccessToken(
            googleClientId, googleClientSecret, refreshToken);
        } else if (error) {
          return Promise.reject(error);
        } else {
          return Promise.resolve({ newAccessToken: accessToken, idToken });
        }
      },
      error => Promise.reject(error))
    .then(
      ({ newAccessToken, idToken }) => Promise.resolve({ accessToken: newAccessToken, idToken }),
      () => Promise.resolve({ accessToken: null, idToken: null }));
  }

  refreshAccessToken(googleClientId, googleClientSecret, refreshToken) {
    const self = this;
    return self.refreshedAccessTokenProvider(googleClientId, googleClientSecret, refreshToken)
    .then(
      newAccessToken => self.idTokenProvider(newAccessToken).then(
        newIdToken => Promise.resolve({
          newAccessToken,
          idToken: newIdToken,
        }),
        error => Promise.reject(error)),
      error => Promise.reject(error));
  }
}
