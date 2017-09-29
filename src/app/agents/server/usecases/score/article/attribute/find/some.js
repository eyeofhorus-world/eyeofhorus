
import PromiseGroup from '../../../../../../../utilities/promise-group';

import arrayHelpers from '../../../../../../../helpers/array-helpers';

import { scoreContextTypes } from '../../../../../../../schemas/score';

import scoreSelectors from '../../../../../entities/score';

export default class ScoreArticleAttributeFindSome {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;
    
    this.run = this.run.bind(this);
  }
  run(articleId, howMany, startingFrom, viewingAsUserId) {
    const self = this;
    const howManyAdjusted = howMany + 1;
    return self.scoreProvider.findAll(scoreContextTypes.articleAttribute, articleId, { limit: howManyAdjusted, skip: startingFrom, ensureSubContextNotNull: true }).then((scores) => {
      const promiseGroup = new PromiseGroup();
      const isThereMore = (scores || []).length > howMany;
      const scoresWithUserScore = [];
      (scores || []).forEach((score, index) => {
        if (index < howMany) {
          promiseGroup.add(self.userScore.find.run(viewingAsUserId, scoreSelectors.id.get(score)).then(
            (userScore) => {
              scoresWithUserScore.push({ key: index, value: Object.assign({}, score, { userScore }) });
              return Promise.resolve({});
            }));
        }
      });
      return promiseGroup.finishAll({ unbox: true, noreject: true }).then(
        () => Promise.resolve({ 
          scores: arrayHelpers.sortArrayByKeyAsNumber(scoresWithUserScore).map(box => box.value), 
          isThereMore,
        }));
    });
  }
}
