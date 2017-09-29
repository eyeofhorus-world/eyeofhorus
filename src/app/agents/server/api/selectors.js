/* eslint-disable no-param-reassign */

export default {
  req: {
    logout: (req) => {
      req.logout();
    },

    isAuthenticated: req => !!req.isAuthenticated || !!req.isAuthenticated(),

    user: {
      get: req => req.user,
      set: (req, value) => {
        req.user = value;
      },

      id: req => ((req && req.user && req.user._id) ? req.user._id : null), // eslint-disable-line no-underscore-dangle
      email: req => ((req && req.user && req.user.email) ? req.user.email : null),
      displayName: req => ((req && req.user && req.user.displayName) ? req.user.displayName : null),
    },

    originalUrl: req => req.originalUrl || req.url,

    session: {
      exists: req => !!req.session,

      reset: (req) => {
        req.session = null;
      },

      forceConsent: (req) => {
        if (req.session) {
          return req.session.forceConsent === true;
        }
        return false;
      },
      setForceConsent: (req, value) => {
        if (!req.session) {
          req.session = {};
        }
        req.session.forceConsent = value === true;
      },
      setReturnTo: (req, value) => {
        if (!req.session) {
          req.session = {};
        }
        req.session.returnTo = value;
      },
      setRedirectSearchQuery: (req, value) => {
        if (!req.session) {
          req.session = {};
        }
        req.session.returnTo = value;
      },
      getRedirectSearchQuery: (req) => {
        if (!req.session) {
          req.session = {};
        }
        return req.session.returnTo || '';
      },
    },

    query: {
      search: (req) => {
        if (req.query) {
          return req.query.search;
        }
        return null;
      },
      forceClientRendering: (req) => {
        if (req.query) {
          return req.query.forceClientRendering === 'true';
        }
        return false;
      },
    },

    searchQuery: req => (req && req.body && req.body.searchQuery ? req.body.searchQuery : ''),
    skip: req => (req && req.body ? parseInt(req.body.skip, 10) : 0),

    quote: req => (req && req.body && req.body.quote ? req.body.quote : ''),
    attributes: req => (req && req.body && req.body.attributes ? req.body.attributes : []),

    articleQuote: req => (req && req.body && req.body.articleQuote ? req.body.articleQuote : ''),
    attributeQuote: req => (req && req.body && req.body.attributeQuote ? req.body.attributeQuote : ''),

    scoreId: req => (req && req.body && req.body.scoreId ? req.body.scoreId : ''),

    userTrackingContext: req => (req && req.body && req.body.userTrackingContext ? JSON.parse(req.body.userTrackingContext) : {}),
  },
};
