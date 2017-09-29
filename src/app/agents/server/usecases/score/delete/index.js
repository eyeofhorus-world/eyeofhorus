
export default class ScoreDelete {
  constructor(scoreProvider, userScore) {
    this.scoreProvider = scoreProvider;
    this.userScore = userScore;

    this.run = this.run.bind(this);
  }
  run(scoreId) {
    const self = this;
    return self.scoreProvider.deleteScoreById(scoreId).then(() => 
      self.userScore.delete.all.for.score(scoreId));
  }
}
