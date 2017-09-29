
import Immutable from 'immutable';

import articleSelectors from '../../../entities/article';

const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const halfAnHour = 30 * oneMinute;

export default class SearchIndexCorpusBuildUsecase {
  constructor(articlesProvider, article, score) {
    this.articlesProvider = articlesProvider;
    this.article = article;
    this.score = score;

    this.run = this.run.bind(this);
    this.judge = this.judge.bind(this);
    this.delete = this.delete.bind(this);
  }
  run() {
    const self = this;
    const now = new Date();
    const halfAnHourBeforeNow = new Date(now.getTime() - halfAnHour);
    const bigBang = new Date(0);
    return self.articlesProvider.forEachCreatedBetweenDates(bigBang, halfAnHourBeforeNow, thisArticle => 
      self.judge(thisArticle)
      .then(({ article, shouldDelete }) => {
        if (shouldDelete === true) {
          return self.delete(article);
        } else {
          return Promise.resolve({});
        }
      })
      .then(() => Promise.resolve({}), () => Promise.resolve({})));
  }
  judge(articleDehydrated) {
    const self = this;
    const articleId = articleSelectors.id.get(articleDehydrated);
    return self.article.find.by.id.run(articleId)
      .then(article => Promise.resolve(Immutable.fromJS(article)))
      .then((article) => {
        if (!article) {
          return Promise.resolve({ 
            article, 
            isEverAnAttributeWithScoreAboveZero: false, 
          });
        } else {
          return self.score.article.is.ever.an.attribute.run(articleId)
            .then(isEverAnAttributeWithScoreAboveZero => Promise.resolve({ 
              article, 
              isEverAnAttributeWithScoreAboveZero,
            }));
        }
      })
      .then(({ article, isEverAnAttributeWithScoreAboveZero }) => {
        if (!article) {
          return Promise.resolve({ article: null, shouldDelete: false });
        }
        const doesArticleHaveZeroScore = article.getIn(['truthful', 'up']) === 0 && 
          article.getIn(['truthful', 'down']) === 0;

        const hasAttributesWithScoreAboveZero = (
          (article.get('attributes') || Immutable.fromJS([])).size > 0 &&
          (article.get('attributes') || Immutable.fromJS([])).some(attribute => (
            attribute.getIn(['score', 'up']) > 0 || attribute.getIn(['score', 'down']) > 0)) === true);

        return ({
          article,
          shouldDelete: (doesArticleHaveZeroScore === true && 
            hasAttributesWithScoreAboveZero !== true &&
            isEverAnAttributeWithScoreAboveZero !== true),
        });
      });
  }
  delete(article) {
    return this.article.delete.run(article.get('_id'));
  }
}
