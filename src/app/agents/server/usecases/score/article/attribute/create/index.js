
import { scoreContextTypes } from '../../../../../../../schemas/score';

import scoreSelectors from '../../../../../entities/score';

export default class ScoreArticleAttributeCreateUsecase {
  constructor(scoreProvider) {
    this.scoreProvider = scoreProvider;

    this.run = this.run.bind(this);
  }
  run(articleId, attributeId) {
    return this.scoreProvider.createScore(scoreContextTypes.articleAttribute, articleId, attributeId)
      .then(({ value /* , preexisting */ }) => {
        const scoreId = scoreSelectors.id.get(value);
        if (scoreId) {
          return Promise.resolve(scoreId);
        } else {
          return Promise.reject({ message: 'Attribute score didn\'t create well formed' });
        }
      });
  }
}
