
import universalRenderer from '../../../client/framework/renderers/universal';

import { actions as userActions } from '../../../client/framework/ducks/user';

import selectors from '../selectors';

export default class FrontendView {
  constructor(commonApi, clientProviders) {
    this.commonApi = commonApi;
    this.clientProviders = clientProviders;

    this.renderPage = this.renderPage.bind(this);
  }
  renderPage(req, res) {
    const self = this;
    universalRenderer(req.originalUrl, {
      providers: self.clientProviders,
      appWillMount: (promiseGroup, store) => {
        const userId = selectors.req.user.id(req);
        const userEmail = selectors.req.user.email(req);
        const userDisplayName = selectors.req.user.displayName(req);

        if (userId && userEmail) {
          store.dispatch(userActions.signedIn(
            userId, userEmail, userDisplayName));
        } else {
          store.dispatch(userActions.signedOut());
        }
      },
      appRendered: (error, redirectLocation, product, notFoundProduct) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          self.commonApi.internalServerError(res, error);
        } else if (product) {
          self.commonApi.html(res, product, { noCache: true });
        } else {
          self.commonApi.notFound(res, notFoundProduct);
        }
      },
    });
  }
}
