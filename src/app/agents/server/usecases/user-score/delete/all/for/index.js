
import Score from './score';

export default (providers) => {
  const score = new Score(providers.userScore);

  return ({
    score,
  });
};
