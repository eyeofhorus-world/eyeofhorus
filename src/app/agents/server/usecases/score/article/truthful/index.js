
import Create from './create';
import Find from './find';
import Delete from './delete';

export default (providers, userScore) => {
  const create = new Create(providers.score);
  const find = new Find(providers.score, userScore);
  const deleter = new Delete(providers.score, userScore);

  return ({
    create,
    find,
    delete: deleter,
  });
};
