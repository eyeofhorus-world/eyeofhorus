
import All from './all';
import Some from './some';

export default (providers, userScore) => {
  const all = new All(providers.score, userScore);
  const some = new Some(providers.score, userScore);

  return ({
    all,
    some,
  });
};
