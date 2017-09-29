
import View from './view';

export default (app, usecases, commonApi, authApi) => {
  const view = new View(usecases, commonApi);

  app.post('/article/add/attribute', authApi.rejectIfUnauthorized, view.articleAddAttribute);
  app.post('/article/get/attributes', authApi.populateAuthorizationInfo, view.articleGetAttributes);
};
