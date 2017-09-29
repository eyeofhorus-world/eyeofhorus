
export default class ArticleDelete {
  constructor(articleProvider, score, searchDirectory) {
    this.articleProvider = articleProvider;
    this.score = score;
    this.searchDirectory = searchDirectory;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    const self = this;
    return self.articleProvider.deleteArticleWithId(articleId)
      .then(() => self.score.article.truthful.delete.run(articleId))
      .then(() => self.score.article.clean.all.run(articleId))
      .then(() => self.searchDirectory.delete.article.run(articleId));
  }
}
