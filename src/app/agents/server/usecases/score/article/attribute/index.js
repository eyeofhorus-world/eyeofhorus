
import ScoreArticleAttributeCreateUsecase from './create';
import createFindUsecases from './find';

export default (providers, userScore) => {
  const create = new ScoreArticleAttributeCreateUsecase(providers.score);
  const find = createFindUsecases(providers, userScore);

  return ({
    create,
    find,
  });
};
