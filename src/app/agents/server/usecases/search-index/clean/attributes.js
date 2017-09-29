
import scoreSchema from '../../../../../schemas/score';

import scoreSelectors from '../../../entities/score';

const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const halfAnHour = 30 * oneMinute;

export default class SearchIndexCleanAttributes {
  constructor(scoreProvider, article) {
    this.scoreProvider = scoreProvider;
    this.article = article;

    this.run = this.run.bind(this);
    this.clean = this.clean.bind(this);
  }
  run() {
    const self = this;
    const now = new Date();
    const halfAnHourBeforeNow = new Date(now.getTime() - halfAnHour);
    const bigBang = new Date(0);
    return self.scoreProvider.forEachZeroCreatedBetweenDatesWithContextType(
      scoreSchema.contextTypes.articleAttribute, bigBang, halfAnHourBeforeNow, thisScore => self.clean(thisScore));
  }
  clean(score) {
    return this.article.delete.attribute.run(
      scoreSelectors.id.get(score), scoreSelectors.contextId.get(score));
  }
}
