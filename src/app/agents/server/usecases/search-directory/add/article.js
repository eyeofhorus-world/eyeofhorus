
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import arrayHelpers from '../../../../../helpers/array-helpers';
import { unescape } from '../../../../../helpers/string-helpers';

import scoreSchemas from '../../../../../schemas/score';

import { schema as documentTagSchema } from '../../../entities/document-tag';
import articleSelectors from '../../../entities/article';
import scoreSelectors from '../../../entities/score';

const splitRegex = /[\s\-]+/; // eslint-disable-line no-useless-escape

export default class SearchIndexAddArticleUsecase {
  constructor(scoreProvider, articleProvider, indexAddDocument) {
    this.articleProvider = articleProvider;
    this.scoreProvider = scoreProvider;
    this.indexAddDocument = indexAddDocument;

    this.run = this.run.bind(this);
    this.articleQuoteTags = this.articleQuoteTags.bind(this);
    this.articleAttributeTags = this.articleAttributeTags.bind(this);
  }
  run(articleId) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    let documentTags = [];

    promiseGroup.add(self.articleQuoteTags(articleId).then((tags) => {
      if (tags) {
        documentTags = documentTags.concat(tags);
      }
      return Promise.resolve({});
    }));

    promiseGroup.add(self.articleAttributeTags(articleId).then((tags) => {
      if (tags) {
        documentTags = documentTags.concat(tags);
      }
      return Promise.resolve({});
    }));

    return promiseGroup.finishAll().then(() => Promise.resolve(Immutable.fromJS(documentTags)))
      .then(tags => self.indexAddDocument.run(
        documentTagSchema.documentTypes.article, articleId, tags));
  }
  articleQuoteTags(articleId) {
    return this.articleProvider.findById(articleId).then((article) => {
      const quote = unescape(articleSelectors.quote.get(article) || '');
      const quoteTags = quote.toString().trim().split(splitRegex);
      return Promise.resolve(
        arrayHelpers.filterNulls([].concat.apply([], [quoteTags])) || []);
    });
  }
  articleAttributeTags(articleId) {
    const self = this;
    let allAttributeTags = [];
    return self.scoreProvider.forEachNonZeroInContext(scoreSchemas.contextTypes.articleAttribute, articleId, (score) => {
      const scoreUpVote = scoreSelectors.up.get(score);
      const scoreDownVote = scoreSelectors.down.get(score);
      if (scoreUpVote >= scoreDownVote) {
        return self.articleQuoteTags(scoreSelectors.subContextId.get(score)).then((tags) => {
          if (tags) {
            allAttributeTags = allAttributeTags.concat(tags);
          }
          return Promise.resolve({});
        });
      } else {
        return Promise.resolve({});
      }
    }).then(() => Promise.resolve(allAttributeTags));
  }
}
