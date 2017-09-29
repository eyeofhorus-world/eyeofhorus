
export default class ScoreArticleCleanAll {
  constructor(scoreProvider) {
    this.scoreProvider = scoreProvider;
    this.run = this.run.bind(this);
  }
  run(articleId) {
    const self = this;
    return self.scoreProvider.deleteAnyWith(articleId);
  }
}
