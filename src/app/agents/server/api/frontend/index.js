
import FrontendView from './view';

export default (app, usecases, commonApi, authApi, clientProviders) => {
  const view = new FrontendView(commonApi, clientProviders);

  app.get('*', authApi.populateAuthorizationInfo, view.renderPage);
};
