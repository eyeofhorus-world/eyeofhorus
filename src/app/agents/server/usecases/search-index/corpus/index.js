
import Build from './build';

export default (providers, searchIndexState) => {
  const build = new Build(providers.article, providers.documentTag, providers.corpus, searchIndexState);

  return ({
    build,
  });
};
