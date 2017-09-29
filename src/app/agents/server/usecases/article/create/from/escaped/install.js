
export default class InstallUsecase {
  constructor(searchDirectory) {
    this.searchDirectory = searchDirectory;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    return this.searchDirectory.add.article.run(articleId)
      .then(() => Promise.resolve(articleId));
  }
}
