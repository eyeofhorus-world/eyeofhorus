
import scoreSelectors from '../../../../entities/score';

export default class ScoreFindById {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;

    this.run = this.run.bind(this);
  }
  run(scoreId, viewingAsUserId) {
    const self = this;
    return self.scoreProvider.findById(scoreId)
      .then((score) => {
        if (score) {
          return Promise.resolve(score);
        } else {
          return Promise.reject({});
        }
      })
      .then(score => self.userScore.find.run(viewingAsUserId, scoreSelectors.id.get(score))
        .then(userScore => Promise.resolve(Object.assign({}, score, { userScore }))));
  }
}
