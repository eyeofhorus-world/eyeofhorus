
import createSharedUsecases from '../../../usecases';

import createPresentUsecases from './present';
import createArticleUsecases from './article';
import createSearchUsecases from './search';
import createScoreUsecases from './score';

export default (providers) => {
  const shared = createSharedUsecases();

  const present = createPresentUsecases();
  const article = createArticleUsecases(providers, shared, present);
  const search = createSearchUsecases(providers, shared, present);
  const score = createScoreUsecases(providers, present);

  return ({
    article,
    search,
    score,
  });
};
