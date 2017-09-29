
import Id from './id';
import createQuoteUsecases from './quote';

export default (providers, score, articleAttributes, articleCreate) => {
  const id = new Id(providers.article, score, articleAttributes);
  const quote = createQuoteUsecases(providers, articleCreate, id);

  return ({
    id,
    quote,
  });
};
