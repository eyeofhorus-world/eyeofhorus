
import selectors from '../selectors'; // eslint-disable-line no-unused-vars

import Presenter from './presenter';

export default class ScoreView {
  constructor(usecases, commonApi) {
    this.commonApi = commonApi;
    this.presenter = new Presenter(usecases);

    this.scoreVoteUp = this.scoreVoteUp.bind(this);
    this.scoreVoteDown = this.scoreVoteDown.bind(this);
  }
  scoreVoteUp(req, res) {
    const self = this;
    this.presenter.onScoreVoteUp(
      selectors.req.scoreId(req),
      selectors.req.user.id(req),
      selectors.req.userTrackingContext(req))
    .then(
      (score) => {
        self.commonApi.json(res, {
          success: true,
          score,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
  scoreVoteDown(req, res) {
    const self = this;
    this.presenter.onScoreVoteDown(
      selectors.req.scoreId(req),
      selectors.req.user.id(req),
      selectors.req.userTrackingContext(req))
    .then(
      (score) => {
        self.commonApi.json(res, {
          success: true,
          score,
        });
      },
      (error) => {
        self.commonApi.internalServerError(res, error);
      });
  }
}
