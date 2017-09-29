
import createStateUsecases from './state';
import createCorpusUsecases from './corpus';
import Clean from './clean';

export default (providers, shared, article, score) => {
  const state = createStateUsecases();
  const corpus = createCorpusUsecases(providers, state);
  
  const clean = new Clean(providers.article, providers.score, article, score, state);

  return ({
    state,
    corpus,
    clean,
  });
};
