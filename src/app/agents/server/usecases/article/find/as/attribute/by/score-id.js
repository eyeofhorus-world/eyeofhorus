
export default class ArticleFindAsAttributeByScore {
  constructor(score, findAsAttributeByScore) {
    this.score = score;
    this.findAsAttributeByScore = findAsAttributeByScore;
    
    this.run = this.run.bind(this);
  }
  run(scoreId, viewingAsUserId = null) {
    const self = this;
    return self.score.find.by.id.run(scoreId, viewingAsUserId).then(
      score => self.findAsAttributeByScore.run(score));
  }
}
