
import createWithUsecases from './with';

export default (providers, searchDirectory) => {
  const withUsecases = createWithUsecases(providers, searchDirectory);

  return ({
    with: withUsecases,
  });
};
