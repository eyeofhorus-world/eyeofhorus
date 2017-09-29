
import scoreSelectors from '../../../../../../entities/score';
import articleSelectors from '../../../../../../entities/article';

export default class ArticleFindAsAttributeByScore {
  constructor(articleProvider) {
    this.articleProvider = articleProvider;
    
    this.run = this.run.bind(this);
  }
  run(attributeScore) {
    const scoreSubContextId = scoreSelectors.subContextId.get(attributeScore);
    if (scoreSubContextId) {
      return this.articleProvider.findById(scoreSubContextId).then((attributeArticle) => {
        const documentId = articleSelectors.id.get(attributeArticle);
        if (documentId) {
          return Promise.resolve(Object.assign({}, attributeArticle, { score: attributeScore }));
        }
        return Promise.reject({});
      });
    } else {
      return Promise.reject({});
    }
  }
}
