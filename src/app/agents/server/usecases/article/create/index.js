
import createFromUsecases from './from';

export default (articleProvider, validation, score, searchDirectory) => {
  const from = createFromUsecases(articleProvider, validation, score, searchDirectory);

  return ({
    from,
  });
};
