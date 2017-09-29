
import View from './view';

export default (app, usecases, commonApi, authApi) => {
  const view = new View(usecases, commonApi);

  app.post('/score/vote/up', authApi.rejectIfUnauthorized, view.scoreVoteUp);
  app.post('/score/vote/down', authApi.rejectIfUnauthorized, view.scoreVoteDown);
};
