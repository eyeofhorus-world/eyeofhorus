
import PromiseGroup from '../../../../../../../utilities/promise-group';

import { scoreContextTypes } from '../../../../../../../schemas/score';

import scoreSelectors from '../../../../../entities/score';

export default class All {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;
    
    this.run = this.run.bind(this);
  }
  run(articleId, viewingAsUserId) {
    const self = this;
    return self.scoreProvider.findAll(scoreContextTypes.articleAttribute, articleId).then((scores) => {
      const promiseGroup = new PromiseGroup();
      const scoresWithUserScore = [];
      (scores || []).forEach((score) => {
        promiseGroup.add(self.userScore.find.run(viewingAsUserId, scoreSelectors.id.get(score)).then(
          (userScore) => {
            scoresWithUserScore.push(Object.assign({}, score, { userScore }));
            return Promise.resolve({});
          }));
      });
      return promiseGroup.finishAll({ unbox: true, noreject: true }).then(
        () => Promise.resolve(scoresWithUserScore));
    });
  }
}
