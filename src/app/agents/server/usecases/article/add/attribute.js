
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

export default class ArticleAddAttribute {
  constructor(articleFind, score, searchDirectory, userTracking) {
    this.articleFind = articleFind;
    this.score = score;
    this.searchDirectory = searchDirectory;
    this.userTracking = userTracking;

    this.run = this.run.bind(this);
    this.hydrate = this.hydrate.bind(this);
    this.create = this.create.bind(this);
  }
  run(articleQuote, attributeQuote, viewingAsUserId, userTrackingContext) {
    const self = this;
    return self.hydrate(articleQuote, attributeQuote, viewingAsUserId)
      .then(({ articleAddingTo, attributeArticle }) => self.create(articleAddingTo, attributeArticle, viewingAsUserId))
      .then(value => self.userTracking.modified.article.with.quote.run(articleQuote, viewingAsUserId, userTrackingContext)
        .then(() => Promise.resolve(value)));
  }
  hydrate(articleQuote, attributeQuote, viewingAsUserId) {
    const self = this;
    const promiseGroup = new PromiseGroup();

    let articleAddingTo = null;
    promiseGroup.add(self.articleFind.by.quote.unescaped.run(articleQuote, viewingAsUserId).then((article) => {
      if (article) {
        articleAddingTo = Immutable.fromJS(article);
      }
      return Promise.resolve({});
    }));

    let attributeArticle = null;
    promiseGroup.add(self.articleFind.by.quote.unescaped.run(attributeQuote, viewingAsUserId).then((article) => {
      if (article) {
        attributeArticle = Immutable.fromJS(article);
      }
      return Promise.resolve({});
    }));

    return promiseGroup.finishAll().then(() => {
      if (articleAddingTo && attributeArticle) {
        return Promise.resolve({ articleAddingTo, attributeArticle });
      }
      return Promise.resolve({});
    });
  }
  create(articleAddingTo, attributeArticle, viewingAsUserId) {
    const articleAddingToId = articleAddingTo.get('_id');
    const attributeArticleId = attributeArticle.get('_id');
    const self = this;
    return self.score.article.attribute.create.run(articleAddingToId, attributeArticleId).then(
      scoreId => self.searchDirectory.add.article.run(articleAddingToId).then(() => Promise.resolve(scoreId))).then(
      scoreId => self.articleFind.as.attribute.by.scoreId.run(scoreId, viewingAsUserId)).then(
        articleAsAttribute => Promise.resolve(Immutable.fromJS(articleAsAttribute || {})));
  }
}
