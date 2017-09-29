
import scoreSchema from '../../../../../../../../schemas/score';

export default class ScoreArticleIsEverAnAttribute {
  constructor(scoreProvider) {
    this.scoreProvider = scoreProvider;

    this.run = this.run.bind(this);
  }
  run(attributeId) {
    return this.scoreProvider.hasFromSubcontextWithNonZeroScores(
        scoreSchema.contextTypes.articleAttribute, attributeId);
  }
}
