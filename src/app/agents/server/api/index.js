
import internalProviders from '../providers/internal';
import createClientProviders from '../providers/client';

import createUsecases from '../usecases';

import installCommonApi from './common';
import installAuthApi from './auth';
import installFrontendApi from './frontend';
import installSearchApi from './search';
import installArticleApi from './article';
import installScoreApi from './score';

export default (googleConfig, app, jobs) => {
  const usecases = createUsecases(internalProviders);

  jobs.add(usecases.searchIndex.clean.run);
  jobs.add(usecases.searchIndex.corpus.build.run);
  
  const commonApi = installCommonApi(app, usecases);
  const authApi = installAuthApi(googleConfig, app, usecases, commonApi);
  const searchApi = installSearchApi(app, usecases, commonApi, authApi);
  installArticleApi(app, usecases, commonApi, authApi);
  installScoreApi(app, usecases, commonApi, authApi);

  const clientProviders = createClientProviders(searchApi.searchPresenter);
  installFrontendApi(app, usecases, commonApi, authApi, clientProviders);
};
