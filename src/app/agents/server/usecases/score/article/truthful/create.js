
import { scoreContextTypes } from '../../../../../../schemas/score';

import scoreSelectors from '../../../../entities/score';

export default class ScoreArticleTruthfulnessCreateUsecase {
  constructor(scoreProvider) {
    this.scoreProvider = scoreProvider;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    return this.scoreProvider.createScore(scoreContextTypes.articleTruthful, articleId)
      .then(({ value /* , preexisting */ }) => {
        const scoreId = scoreSelectors.id.get(value);
        if (scoreId) {
          return Promise.resolve(scoreId);
        } else {
          return Promise.reject({ message: 'Truthful score didn\'t create well formed' });
        }
      });
  }
}
