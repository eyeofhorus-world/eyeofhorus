
import Reindex from './reindex';

import createArticleUsecases from './article';
import createFindUsecases from './find';
import createVoteUsecases from './vote';

import ScoreDelete from './delete';

export default (providers, userScore, searchDirectory, userTracking) => {
  const article = createArticleUsecases(providers, userScore);
  const find = createFindUsecases(providers, userScore);
  const reindex = new Reindex(providers.score, providers.userScore, searchDirectory);
  const vote = createVoteUsecases(providers, userScore, find, reindex, userTracking);
  const deleter = new ScoreDelete(providers.score, userScore);

  return ({
    article,
    find,
    vote,
    delete: deleter,
  });
};
