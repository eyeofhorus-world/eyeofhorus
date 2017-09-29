
import PromiseGroup from '../../../../../../utilities/promise-group';

import arrayHelpers from '../../../../../../helpers/array-helpers';

export default class ArticleAttributesFindSomeUsecase {
  constructor(score, userTracking, articleFindAs) {
    this.score = score;
    this.userTracking = userTracking;
    this.articleFindAs = articleFindAs;
    
    this.run = this.run.bind(this);
  }
  run(articleId, howMany, startingFrom, viewingAsUserId = undefined, userTrackingContext = undefined) {
    const self = this;
    return self.score.article.attribute.find.some.run(articleId, howMany, startingFrom, viewingAsUserId)
      .then(({ scores, isThereMore }) => {
        const promiseGroup = new PromiseGroup();
        const attributes = [];
        (scores || []).forEach((attributeScore, index) => {
          promiseGroup.add(self.articleFindAs.attribute.by.score.run(attributeScore).then((articleAsAttribute) => {
            if (articleAsAttribute) {
              attributes.push({ key: index, value: articleAsAttribute });
            }
            return Promise.resolve({});
          }, () => Promise.resolve({})));
        });
        return promiseGroup.finishAll({ unbox: true, noreject: true })
          .then(() => Promise.resolve({ 
            values: arrayHelpers.sortArrayByKeyAsNumber(attributes).map(box => box.value),
            isThereMore,
          }));
      })

      .then(value => self.userTracking.viewed.article.with.id.run(articleId, viewingAsUserId, userTrackingContext)
        .then(() => Promise.resolve(value)));
  }
}
