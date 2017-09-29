
export default class UserScoreDeleteAllForScore {
  constructor(userScoreProvider) {
    this.userScoreProvider = userScoreProvider;

    this.run = this.run.bind(this);
  }
  run(scoreId) {
    return this.userScoreProvider.removeAllUserScoresForScore(scoreId);
  }
}
