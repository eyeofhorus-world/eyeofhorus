
import createAddUsecases from './add';
import createDeleteUsecases from './delete';
import createLinkUsecases from './link';

export default (providers) => {
  const add = createAddUsecases(providers);
  const deleter = createDeleteUsecases(providers);
  const link = createLinkUsecases(providers);

  return ({
    add,
    delete: deleter,
    link,
  });
};
