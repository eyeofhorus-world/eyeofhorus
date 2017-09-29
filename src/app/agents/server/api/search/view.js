
import selectors from '../selectors'; // eslint-disable-line no-unused-vars

import Presenter from './presenter';

export default class SearchView {
  constructor(usecases, commonApi) {
    this.commonApi = commonApi;
    this.presenter = new Presenter(usecases);

    this.search = this.search.bind(this);
    this.mostRecent = this.mostRecent.bind(this);
  }
  search(req, res) {
    const self = this;
    this.presenter.onSearch(
      selectors.req.searchQuery(req),
      selectors.req.skip(req),
      selectors.req.user.id(req))
    .then(
      (results) => {
        self.commonApi.json(res, {
          success: true,
          found: results,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
  mostRecent(req, res) {
    const self = this;
    this.presenter.onMostRecent(
      selectors.req.user.id(req))
    .then(
      (results) => {
        self.commonApi.json(res, {
          success: true,
          found: results,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
}
