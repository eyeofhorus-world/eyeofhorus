
import PromiseGroup from '../../../../../../utilities/promise-group';

const howManyAttributesPerArticleMax = 3;
const startFromFirstIndex = 0;

export default class ArticleFindByIdUsecase {
  constructor(articleProvider, score, articleAttributes) {
    this.articleProvider = articleProvider;
    this.score = score;
    this.articleAttributes = articleAttributes;

    this.run = this.run.bind(this);
  }
  run(articleId, viewingAsUserId) {
    const promiseGroup = new PromiseGroup();
    
    let article = null;
    promiseGroup.add(this.articleProvider.findById(articleId).then((articleDocument) => {
      if (articleDocument) {
        article = articleDocument;
      }
      return Promise.resolve({});
    }));
    
    let truthful = null;
    promiseGroup.add(this.score.article.truthful.find.run(articleId, viewingAsUserId).then((score) => {
      if (score) {
        truthful = score;
      }
      return Promise.resolve({});
    }));
    
    let attributes = [];
    let areThereMoreAttributes = false;
    promiseGroup.add(this.articleAttributes.find.some.run(articleId, howManyAttributesPerArticleMax, startFromFirstIndex, viewingAsUserId).then(({ values, isThereMore }) => {
      if (values && Array.isArray(values)) {
        attributes = values;
        areThereMoreAttributes = isThereMore;
      }
      return Promise.resolve({});
    }));

    return promiseGroup.finishAll()
      .then(() => {
        if (article && truthful) {
          return Promise.resolve(Object.assign({}, 
            article, { truthful, attributes, areThereMoreAttributes }));
        } else {
          return Promise.reject({});
        }
      });
  }
}
