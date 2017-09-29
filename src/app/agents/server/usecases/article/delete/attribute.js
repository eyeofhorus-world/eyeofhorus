
export default class ArticleDeleteAttribute {
  constructor(score, searchDirectory) {
    this.score = score;
    this.searchDirectory = searchDirectory;
    
    this.run = this.run.bind(this);
  }
  run(scoreId, articleId) {
    const self = this;
    return self.score.delete.run(scoreId)
      .then(() => self.searchDirectory.add.article.run(articleId));
  }
}
