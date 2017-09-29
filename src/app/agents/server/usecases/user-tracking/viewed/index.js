
import createArticleUsecases from './article';

export default (providers, searchDirectory) => {
  const article = createArticleUsecases(providers, searchDirectory);

  return ({
    article,
  });
};
