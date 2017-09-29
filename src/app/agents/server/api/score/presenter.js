
export default class ScorePresenter {
  constructor(usecases) {
    this.usecases = usecases;

    this.onScoreVoteUp = this.onScoreVoteUp.bind(this);
    this.onScoreVoteDown = this.onScoreVoteDown.bind(this);
  }
  onScoreVoteUp(scoreId, viewingAsUserId, userTrackingContext) {
    return this.usecases.score.vote.up.run(scoreId, viewingAsUserId, userTrackingContext);
  }
  onScoreVoteDown(scoreId, viewingAsUserId, userTrackingContext) {
    return this.usecases.score.vote.down.run(scoreId, viewingAsUserId, userTrackingContext);
  }
}
