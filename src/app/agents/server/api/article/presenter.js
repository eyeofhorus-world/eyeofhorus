
import articleSelectors from '../../entities/article';

export default class ArticlePresenter {
  constructor(usecases) {
    this.usecases = usecases;

    this.onArticleAddAttribute = this.onArticleAddAttribute.bind(this);
    this.onArticleGetAttributes = this.onArticleGetAttributes.bind(this);
  }
  onArticleAddAttribute(articleQuote, attributeQuote, viewingAsUserId, userTrackingContext) {
    return this.usecases.article.add.attribute.run(articleQuote, attributeQuote, viewingAsUserId, userTrackingContext);
  }
  onArticleGetAttributes(articleQuote, skip, viewingAsUserId, userTrackingContext) {
    const self = this;
    return this.usecases.article.find.by.quote.unescaped.run(articleQuote, viewingAsUserId).then(
      article => self.usecases.article.attributes.find.some.run(articleSelectors.id.get(article), 3, skip, viewingAsUserId, userTrackingContext).then(({ values, isThereMore }) => Promise.resolve({ 
        attributes: values, areThereMoreAttributes: isThereMore })));
  }
}
