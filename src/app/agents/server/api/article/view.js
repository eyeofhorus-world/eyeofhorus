
import selectors from '../selectors'; // eslint-disable-line no-unused-vars

import Presenter from './presenter';

export default class ArticleView {
  constructor(usecases, commonApi) {
    this.commonApi = commonApi;
    this.presenter = new Presenter(usecases);

    this.articleAddAttribute = this.articleAddAttribute.bind(this);
    this.articleGetAttributes = this.articleGetAttributes.bind(this);
  }
  articleAddAttribute(req, res) {
    const self = this;
    this.presenter.onArticleAddAttribute(
      selectors.req.articleQuote(req),
      selectors.req.attributeQuote(req),
      selectors.req.user.id(req),
      selectors.req.userTrackingContext(req))
    .then(
      (attribute) => {
        self.commonApi.json(res, {
          success: true,
          attribute,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
  articleGetAttributes(req, res) {
    const self = this;
    this.presenter.onArticleGetAttributes(
      selectors.req.articleQuote(req),
      selectors.req.skip(req),
      selectors.req.user.id(req),
      selectors.req.userTrackingContext(req))
    .then(
      (value) => {
        self.commonApi.json(res, {
          success: true,
          value,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
}
