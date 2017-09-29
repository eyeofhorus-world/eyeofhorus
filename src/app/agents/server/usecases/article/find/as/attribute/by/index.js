
import Score from './score';
import ScoreId from './score-id';

export default (providers, score) => {
  const findAsAttributeByScore = new Score(providers.article);
  const scoreId = new ScoreId(score, findAsAttributeByScore);
  
  return ({
    score: findAsAttributeByScore,
    scoreId,
  });
};
