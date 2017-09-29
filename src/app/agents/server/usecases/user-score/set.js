
export default class UserScoreSet {
  constructor(userScoreProvider) {
    this.userScoreProvider = userScoreProvider;

    this.run = this.run.bind(this);
  }
  run(userId, scoreId, userScoreValueType) {
    return this.userScoreProvider.makeUserScore(userId, scoreId, userScoreValueType);
  }
}
