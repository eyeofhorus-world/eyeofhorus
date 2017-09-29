
export default class InstallUsecase {
  constructor(score) {
    this.score = score;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    return this.score.article.truthful.create.run(articleId)
      .then(() => Promise.resolve(articleId));
  }
}
