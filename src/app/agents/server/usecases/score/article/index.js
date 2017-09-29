
import createAttributeUsecases from './attribute';
import createCleanUsecases from './clean';
import createIsUsecases from './is';
import createTruthfulUsecases from './truthful';

export default (providers, userScore) => {
  const attribute = createAttributeUsecases(providers, userScore);
  const clean = createCleanUsecases(providers);
  const is = createIsUsecases(providers);
  const truthful = createTruthfulUsecases(providers, userScore);

  return ({
    attribute,
    clean,
    is,
    truthful,
  });
};
