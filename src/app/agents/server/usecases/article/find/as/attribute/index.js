
import createByUsecases from './by';

export default (providers, score) => {
  const by = createByUsecases(providers, score);

  return ({
    by,
  });
};
