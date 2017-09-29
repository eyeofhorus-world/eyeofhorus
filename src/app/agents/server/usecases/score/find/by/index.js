
import Id from './id';

export default (providers, userScore) => {
  const id = new Id(providers.score, userScore);

  return ({
    id,
  });
};
