
import createArticleUsecases from './article';

export default (providers, userTrackingViewed) => {
  const article = createArticleUsecases(providers, userTrackingViewed);

  return ({
    article,
  });
};
