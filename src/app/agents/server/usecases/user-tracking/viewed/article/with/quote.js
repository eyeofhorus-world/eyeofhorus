
import { escape } from '../../../../../../../helpers/string-helpers';

import articleSelectors from '../../../../../entities/article';

export default class UserTrackingViewedArticleWithQuote {
  constructor(articleProvider, viewedArticleWithId) {
    this.articleProvider = articleProvider;
    this.viewedArticleWithId = viewedArticleWithId;

    this.run = this.run.bind(this);
  }
  run(articleQuoteUnescaped, viewingAsUserId, userTrackingContext) {
    if (articleQuoteUnescaped && viewingAsUserId && userTrackingContext) {
      const self = this;
      return self.articleProvider.findByQuote(escape(articleQuoteUnescaped)).then(
        article => self.viewedArticleWithId.run(
          articleSelectors.id.get(article), viewingAsUserId, userTrackingContext));
    } else {
      return Promise.resolve({});
    }
  }
}
