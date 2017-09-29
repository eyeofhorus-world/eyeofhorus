
import Immutable from 'immutable';

import documentTagSelectors, { schema as documentTagSchema } from '../../../entities/document-tag';

import QueryProcessor from './query-processor';
import EarlyOutChecks from './early-out-checks';
import Search from './search';

export default class SearchTextUsecase {
  constructor(corpusProvider, documentTagProvider, relevanceProvider, article) {
    this.queryProcessor = new QueryProcessor();
    this.earlyOutChecks = new EarlyOutChecks(corpusProvider);
    this.article = article;
    this.search = new Search(corpusProvider, documentTagProvider, relevanceProvider);

    this.run = this.run.bind(this);
  }
  run(queryString) {
    const self = this;
    return self.queryProcessor.run(queryString)
      .then(queryTokens => self.earlyOutChecks.run(queryTokens)
        .then((shouldExecuteSearch) => {
          if (shouldExecuteSearch === true) {
            return self.search.run(queryTokens);
          } else {
            return Promise.resolve(Immutable.fromJS([]));
          }
        }))
      .then((results) => {
        const articles = [];
        (results || []).forEach((result) => {
          const resultMutable = ((result || Immutable.fromJS({})).get('ref') || Immutable.fromJS({})).toJS();
          const documentType = documentTagSelectors.documentType.get(resultMutable);
          const documentId = documentTagSelectors.documentId.get(resultMutable);
          switch (documentType) {
          case documentTagSchema.documentTypes.article:
            articles.push(documentId);
            break;
          default:
            break;
          }
        });
        
        return Promise.resolve(Immutable.fromJS(articles));
      });
  }
}
