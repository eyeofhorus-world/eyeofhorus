
import createByUsecases from './by';

export default (providers, userScore) => {
  const by = createByUsecases(providers, userScore);

  return ({
    by,
  });
};
