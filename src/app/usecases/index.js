
import createArticleUsecases from './article';
import createSearchUsecases from './search';

export default () => {
  const article = createArticleUsecases();
  const search = createSearchUsecases();

  return ({
    article,
    search,
  });
};
