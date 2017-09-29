
import createModifiedUsecases from './modified';
import createViewedUsecases from './viewed';

export default (providers, searchDirectory) => {
  const viewed = createViewedUsecases(providers, searchDirectory);
  const modified = createModifiedUsecases(providers, viewed);

  return ({
    modified,
    viewed,
  });
};
