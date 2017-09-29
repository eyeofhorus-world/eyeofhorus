
import Quote from './quote';
import Id from './id';

export default (providers, searchDirectory) => {
  const id = new Id(providers.article, providers.documentTag, searchDirectory);
  const quote = new Quote(providers.article, id);

  return ({
    quote,
    id,
  });
};
