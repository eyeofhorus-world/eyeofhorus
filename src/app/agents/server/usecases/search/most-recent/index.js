
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import arrayHelpers from '../../../../../helpers/array-helpers';

import articleSelectors from '../../../entities/article';

const showHowManyArticles = 10;

export default class SearchMostRecent {
  constructor(articleProvider, article) {
    this.articleProvider = articleProvider;
    this.article = article;

    this.run = this.run.bind(this);
  }
  run(viewingAsUserId) {
    const self = this;
    return self.articleProvider.findAllSortByUpdatedLastRecent({ limit: showHowManyArticles, skip: 0 })
      .then((articlesDehydrated) => {
        const promiseGroup = new PromiseGroup();
        const articlesHydrated = [];
        (articlesDehydrated || []).forEach((articleDehydrated, index) => {
          promiseGroup.add(self.article.find.by.id.run(articleSelectors.id.get(articleDehydrated), viewingAsUserId).then((article) => {
            if (article) {
              articlesHydrated.push({ key: index, value: article });
            }
            return Promise.resolve({});
          }));
        });
        return promiseGroup.finishAll().then(() => Promise.resolve({ 
          articles: Immutable.fromJS(arrayHelpers.sortArrayByKeyAsNumber(articlesHydrated).map(box => box.value)),
          isThereMore: false,
        }));
      });
  }
}
