
import Immutable from 'immutable';

import helpers from './helpers';

const errorTypes = {
  authentication: 'authentication',
  other: 'other',
};

export default class ScoreVoteDown {
  constructor(scoreProvider, present) {
    this.errorTypes = errorTypes;

    this.scoreProvider = scoreProvider;
    this.present = present;

    this.run = this.run.bind(this);
  }
  run(userTrackingContext, input, stagingCallback) {
    const self = this;
    return Promise.resolve(input || Immutable.fromJS({}))
      .then((score) => {
        if (score.get('downVoted') === true) {
          return helpers.reset(score);
        } else if (score.get('upVoted') === true) {
          return helpers.reset(score).then(resetScore => helpers.toggleDown(resetScore));
        } else {
          return helpers.toggleDown(score);
        }
      })
      .then(score => helpers.refigureFulfillment(score))
      .then((score) => {
        if (stagingCallback) {
          stagingCallback(score);
        }
        return Promise.resolve(score);
      })
      .then(score => self.scoreProvider.voteDown(score.get('_id'), userTrackingContext.toJS()))
      .then((score) => {
        if (score) {
          return Promise.resolve(score);
        }
        return Promise.reject({});
      })
      .then(score => self.present.score.run(Immutable.fromJS(score || {})))
      .then(score => Promise.resolve(score), (error) => {
        if (self.scoreProvider.isAuthenticationError(error)) {
          return Promise.reject({ type: errorTypes.authentication });
        } else {
          return Promise.reject({ type: errorTypes.other });
        }
      });
  }
}
