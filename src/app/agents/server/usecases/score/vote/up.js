
import { userScoreValueTypes } from '../../../../../schemas/user-score';

import scoreSelectors from '../../../entities/score';
import userScoreSelectors from '../../../entities/user-score';

export default class ScoreVoteUp {
  constructor(userScore, scoreFind, scoreReindex, userTracking) {
    this.userScore = userScore;
    this.scoreFind = scoreFind;
    this.scoreReindex = scoreReindex;
    this.userTracking = userTracking;

    this.run = this.run.bind(this);
    this.judge = this.judge.bind(this);
    this.commit = this.commit.bind(this);
  }
  run(scoreId, viewingAsUserId, userTrackingContext) {
    const self = this;
    return self.userScore.find.run(viewingAsUserId, scoreId)
      .then(preexisting => self.judge(preexisting))
      .then(({ shouldReset }) => self.commit(scoreId, viewingAsUserId, shouldReset))
      .then(() => self.scoreReindex.run(scoreId))
      .then(() => self.scoreFind.by.id.run(scoreId, viewingAsUserId))
      .then(score => self.userTracking.modified.article.with.id.run(scoreSelectors.contextId.get(score), viewingAsUserId, userTrackingContext)
        .then(() => Promise.resolve(score)));
  }
  judge(preexisting) {
    if (preexisting) {
      const preexstingValue = userScoreSelectors.value.get(preexisting);
      if (preexstingValue === userScoreValueTypes.up) {
        return Promise.resolve({ shouldReset: true });
      } else {
        return Promise.resolve({ shouldReset: false });
      }
    } else {
      return Promise.resolve({ shouldReset: false });
    }
  }
  commit(scoreId, viewingAsUserId, shouldReset) {
    const self = this;
    if (shouldReset === true) {
      return self.userScore.set.run(viewingAsUserId, scoreId, userScoreValueTypes.none);
    } else {
      return self.userScore.set.run(viewingAsUserId, scoreId, userScoreValueTypes.up);
    }
  }
}
