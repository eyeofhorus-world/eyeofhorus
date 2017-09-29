
import createDeleteUsecases from './delete';
import Find from './find';
import Set from './set';

export default (providers) => {
  const deleteCases = createDeleteUsecases(providers);

  const find = new Find(providers.userScore);
  const set = new Set(providers.userScore);

  return ({
    delete: deleteCases,
    find,
    set,
  });
};
