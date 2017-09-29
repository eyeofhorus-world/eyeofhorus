/* eslint-disable no-underscore-dangle */

import { scoreContextTypes } from '../../../../../../schemas/score';

import scoreSelectors from '../../../../entities/score';

export default class ScoreArticleTruthfulnessFindUsecase {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;

    this.run = this.run.bind(this);
  }
  run(articleId, viewingAsUserId) {
    const self = this;
    return self.scoreProvider.findSingle(scoreContextTypes.articleTruthful, articleId)
      .then((score) => {
        const scoreId = scoreSelectors.id.get(score);
        if (scoreId) {
          return Promise.resolve(score);
        } else {
          return Promise.reject({});
        }
      })
      .then(score => self.userScore.find.run(viewingAsUserId, scoreSelectors.id.get(score))
        .then(userScore => Promise.resolve(Object.assign({}, score, { userScore }))));
  }
}
