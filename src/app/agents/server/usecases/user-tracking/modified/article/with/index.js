
import Id from './id';
import Quote from './quote';

export default (providers, userTrackingViewed) => {
  const id = new Id(providers.article, userTrackingViewed);
  const quote = new Quote(providers.article, id);
  
  return ({
    id,
    quote,
  });
};
