
import createSharedUsecases from '../../../usecases';

import createUserUsecases from './user';
import createUserScoreUsecases from './user-score';
import createScoreUsecases from './score';
import createSearchDirectoryUsecases from './search-directory';
import createArticleUsecases from './article';
import createSearchIndexUsecases from './search-index';
import Search from './search';
import createUserTrackingUsecases from './user-tracking';

export default (providers) => {
  const shared = createSharedUsecases();

  const user = createUserUsecases(providers);
  const userScore = createUserScoreUsecases(providers);
  
  const searchDirectory = createSearchDirectoryUsecases(providers, shared);

  const userTracking = createUserTrackingUsecases(providers, searchDirectory);

  const score = createScoreUsecases(providers, userScore, searchDirectory, userTracking);
  const article = createArticleUsecases(providers, shared, score, searchDirectory, userTracking);

  const searchIndex = createSearchIndexUsecases(providers, shared, article, score);
  const search = new Search(providers, article, searchIndex);

  return ({
    user,
    article,
    score,
    search,
    searchIndex,
    searchDirectory,
  });
};
