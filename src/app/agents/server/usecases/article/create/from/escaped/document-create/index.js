
import { needsToBeEscaped } from '../../../../../../../../helpers/string-helpers';

import articleSelectors from '../../../../../../entities/article';

import InstallUsecase from './install';

export default class Create {
  constructor(articleProvider, score) {
    this.articleProvider = articleProvider;

    this.install = new InstallUsecase(score);

    this.run = this.run.bind(this);
  }
  run(quote) {
    if (needsToBeEscaped(quote)) {
      return Promise.reject({
        message: 'needs to escape the values provided',
      });
    }
    const self = this;
    return self.articleProvider.createArticle(quote)
      .then(({ value /* , preexisting */ }) => {
        const articleId = articleSelectors.id.get(value);
        if (articleId) {
          return self.install.run(articleId);
        } else {
          return Promise.reject({ message: 'Article isn\'t well formed' });
        }
      });
  }
}
