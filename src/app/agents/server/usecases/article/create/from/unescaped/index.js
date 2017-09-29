
import { escape } from '../../../../../../../helpers/string-helpers';

export default class ArticleCreateFromUnescaped {
  constructor(articleCreateFromEscaped) {
    this.articleCreateFromEscaped = articleCreateFromEscaped;

    this.run = this.run.bind(this);
  }
  run(unescapedQuote) {
    const self = this;
    return Promise.resolve(escape(unescapedQuote || ''))
      .then(escapedQuote => self.articleCreateFromEscaped.run(escapedQuote));
  }
}
