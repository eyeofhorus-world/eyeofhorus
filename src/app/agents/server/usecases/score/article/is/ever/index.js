
import createAnUsecases from './an';

export default (providers) => {
  const an = createAnUsecases(providers);

  return ({
    an,
  });
};
