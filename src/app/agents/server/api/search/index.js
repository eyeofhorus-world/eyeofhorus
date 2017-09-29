
import SearchView from './view';

export default (app, usecases, commonApi, authApi) => {
  const view = new SearchView(usecases, commonApi);

  app.post('/search', authApi.populateAuthorizationInfo, view.search);
  app.post('/search/most-recent', authApi.populateAuthorizationInfo, view.mostRecent);
  
  return ({
    searchPresenter: view.presenter,
  });
};
