
import articleSelectors from '../../../../../entities/article';

export default class UserTrackingModifiedArticleWithQuote {
  constructor(articleProvider, userTrackingModifiedArticleWithId) {
    this.articleProvider = articleProvider;
    this.userTrackingModifiedArticleWithId = userTrackingModifiedArticleWithId;

    this.run = this.run.bind(this);
  }
  run(articleQuoteUnescaped, viewingAsUserId, userTrackingContext) {
    const self = this;
    return self.articleProvider.findByQuote(escape(articleQuoteUnescaped))
      .then(article => self.articleProvider.notifyArticleAsBeingUpdated(articleSelectors.id.get(article)))
      .then(article => self.userTrackingModifiedArticleWithId.run(articleSelectors.id.get(article), viewingAsUserId, userTrackingContext));
  }
}
