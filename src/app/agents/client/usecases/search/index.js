
import Main from './main';
import MostRecent from './most-recent';

export default (providers, shared, present) => {
  const main = new Main(providers.search, present);

  const validation = Object.assign({}, shared.search.validation, {
  });

  const mostRecent = new MostRecent(providers.search, present);

  return Object.assign({}, { validation }, main, { mostRecent });
};
