
import articleSelectors from '../../../../../entities/article';

export default class ArticleFindByQuoteEscaped {
  constructor(articleProvider, articleCreate, findById) {
    this.articleProvider = articleProvider;
    this.articleCreate = articleCreate;
    this.findById = findById;

    this.run = this.run.bind(this);
  }
  run(articleQuote, viewingAsUserId) {
    const self = this;
    return self.articleProvider.findByQuote(articleQuote).then(
      (articleDocument) => {
        const documentId = articleSelectors.id.get(articleDocument);

        let makeSureArticleExists = Promise.resolve(documentId);
        if (!documentId) {
          makeSureArticleExists = self.articleCreate.from.escaped.run(articleQuote);
        }

        return makeSureArticleExists.then(
          articleId => self.findById.run(articleId, viewingAsUserId));
      });
  }
}
