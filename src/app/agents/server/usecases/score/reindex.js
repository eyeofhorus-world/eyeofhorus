
import PromiseGroup from '../../../../utilities/promise-group';

import { userScoreValueTypes } from '../../../../schemas/user-score';
import scoreSchema from '../../../../schemas/score';

import scoreSelectors from '../../entities/score';

export default class ScoreReindex {
  constructor(scoreProvider, userScoreProvider, searchDirectory) {
    this.scoreProvider = scoreProvider;
    this.userScoreProvider = userScoreProvider;
    this.searchDirectory = searchDirectory;

    this.run = this.run.bind(this);
    this.judgeContext = this.judgeContext.bind(this);
    this.reindexContext = this.reindexContext.bind(this);
  }
  run(scoreId) {
    const self = this;
    return self.recalculateScoreValues(scoreId).then(
      () => self.scoreProvider.findById(scoreId)).then(
      score => self.judgeContext(score).then(shouldReindex => Promise.resolve({ score, shouldReindex }))).then(
      ({ score, shouldReindex }) => {
        if (shouldReindex === true) {
          return self.reindexContext(score);
        } else {
          return Promise.resolve({});
        }
      });
  }
  recalculateScoreValues(scoreId) {
    const self = this;
    const promiseGroup = new PromiseGroup();

    promiseGroup.add(self.userScoreProvider.countByPredicate({ 
      scoreId, 
      value: userScoreValueTypes.up,
    }).then(
      count => self.scoreProvider.updateUpScore(scoreId, count)));

    promiseGroup.add(self.userScoreProvider.countByPredicate({ 
      scoreId, 
      value: userScoreValueTypes.down,
    }).then(
      count => self.scoreProvider.updateDownScore(scoreId, count)));

    return promiseGroup.finishAll().then(() => Promise.resolve({}));
  }
  judgeContext(score) {
    const contextType = scoreSelectors.contextType.get(score);
    switch (contextType) {
    case scoreSchema.contextTypes.articleAttribute:
      return Promise.resolve(true);
    default:
      return Promise.resolve(false);
    }
  }
  reindexContext(score) {
    return this.searchDirectory.add.article.run(scoreSelectors.contextId.get(score));
  }
}
