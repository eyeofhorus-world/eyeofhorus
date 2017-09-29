
import Immutable from 'immutable';

import PromiseGroup from '../../../../utilities/promise-group';

import arrayHelpers from '../../../../helpers/array-helpers';

export default class SearchMainUsecase {
  constructor(searchProvider, present) {
    this.searchProvider = searchProvider;
    this.present = present;

    this.run = this.run.bind(this);
  }
  run(viewingAsUserId) {
    const self = this;
    return this.searchProvider.mostRecent(viewingAsUserId)
      .then((results) => {
        const promiseGroup = new PromiseGroup();
        
        const articles = [];
        Immutable.fromJS(results.articles || []).forEach((articleResult, index) => {
          promiseGroup.add(self.present.article.run(articleResult).then((conditionedResult) => {
            if (conditionedResult) {
              articles.push({ key: index, value: conditionedResult });
            }
            return Promise.resolve({});
          }));
        });

        return promiseGroup.finishAll({ unbox: true, noreject: true }).then(() => Promise.resolve({
          articles: Immutable.fromJS(arrayHelpers.sortArrayByKeyAsNumber(articles).map(box => box.value)),
          isThereMore: results.isThereMore === true,
        }));
      });
  }
}
