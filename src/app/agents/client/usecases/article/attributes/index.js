
import ShowMore from './show-more';

export default (providers, present) => {
  const showMore = new ShowMore(providers.article, present);

  return ({
    showMore,
  });
};
