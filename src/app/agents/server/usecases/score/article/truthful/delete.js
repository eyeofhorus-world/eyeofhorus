
import { scoreContextTypes } from '../../../../../../schemas/score';

export default class ScoreArticleTruthfulDelete {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    const self = this;
    return self.scoreProvider.deleteScore(scoreContextTypes.articleTruthful, articleId)
      .then((scoreId) => {
        if (scoreId) {
          return self.userScore.delete.all.for.score.run(scoreId)
            .then(() => Promise.resolve({}));
        } else {
          return Promise.resolve({});
        }
      });
  }
}
