
import userScoreSelectors from '../../entities/user-score';

export default class UserScoreFindUsecase {
  constructor(userScoreProvider) {
    this.userScoreProvider = userScoreProvider;

    this.run = this.run.bind(this);
  }
  run(viewingAsUserId, scoreId) {
    return this.userScoreProvider.findForScoreAndUser(scoreId, viewingAsUserId)
      .then(userScore => ((userScore && userScoreSelectors.isWellFormed(userScore) === true) ? 
          Promise.resolve(userScore) : Promise.resolve(undefined)));
  }
}
