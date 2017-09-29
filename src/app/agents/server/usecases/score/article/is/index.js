
import createEverUsecases from './ever';

export default (providers) => {
  const ever = createEverUsecases(providers);

  return ({
    ever,
  });
};
