
import Immutable from 'immutable';

import documentTagSelectors, { schema as documentTagSchema } from '../../../../../entities/document-tag';

export default class UserTrackingViewedArticleWithId {
  constructor(articleProvider, documentTagProvider, searchDirectory) {
    this.articleProvider = articleProvider;
    this.documentTagProvider = documentTagProvider;
    this.searchDirectory = searchDirectory;

    this.run = this.run.bind(this);
    this.extractArticleWords = this.extractArticleWords.bind(this);
    this.extractContextQuery = this.extractContextQuery.bind(this);
    this.howMuchToIncrementRelationsBy = this.howMuchToIncrementRelationsBy.bind(this);
  }
  run(articleId, viewingAsUserId, userTrackingContext) {
    const self = this;
    return self.extractArticleWords(articleId)
      .then(articleWords => self.extractContextQuery(userTrackingContext)
        .then(contextQuery => Promise.resolve({ contextQuery, articleWords })))

      .then(({ articleWords, contextQuery }) => self.howMuchToIncrementRelationsBy(userTrackingContext).then(
        incrementAmount => Promise.resolve({ articleWords, contextQuery, incrementAmount })))

      .then(({ articleWords, contextQuery, incrementAmount }) => self.searchDirectory.link.wordsToText.run(articleWords, contextQuery, incrementAmount))

      .then(() => Promise.resolve({}), () => Promise.resolve({}));
  }
  extractArticleWords(articleId) {
    const self = this;
    return self.documentTagProvider.findAllTagsInDocument(documentTagSchema.documentTypes.article, articleId).then(
      documentTags => Promise.resolve(Immutable.fromJS((documentTags || []).map(
        tag => documentTagSelectors.tagValue.get(tag)))));
  }
  extractContextQuery(userTrackingContext) {
    if (userTrackingContext) {
      const contextQuery = userTrackingContext.query;
      if (contextQuery) {
        return Promise.resolve(contextQuery);
      } else {
        return Promise.reject({});
      }
    } else {
      return Promise.reject({});
    }
  }
  howMuchToIncrementRelationsBy(userTrackingContext) {
    let incrementBy = 0;
    if (userTrackingContext) {
      const userActionsSinceLastSearch = userTrackingContext.userActionsSinceLastSearch;

      incrementBy = 1 - Math.log(userActionsSinceLastSearch * 0.2);
    }
    if (Number.isNaN(incrementBy) || Number.isFinite(incrementBy) !== true) {
      incrementBy = 5;
    }

    if (incrementBy > 0) {
      return Promise.resolve(incrementBy);
    } else {
      return Promise.reject({});
    }
  }
}
