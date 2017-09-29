
import All from './all';

export default (providers, userScore) => {
  const all = new All(providers.score, userScore);

  return ({
    all,
  });
};
