
import { escape } from '../../../../../../../helpers/string-helpers';

export default class ArticleFindByQuoteUnescaped {
  constructor(articleFindByQuoteEscaped) {
    this.articleFindByQuoteEscaped = articleFindByQuoteEscaped;

    this.run = this.run.bind(this);
  }
  run(quoteUnescaped) {
    const self = this;
    return Promise.resolve(escape(quoteUnescaped || '')).then(
      quoteEscaped => self.articleFindByQuoteEscaped.run(quoteEscaped));
  }
}
