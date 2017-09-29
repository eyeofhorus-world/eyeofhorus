
import DocumentCreateUsecase from './document-create';
import InstallUsecase from './install';

export default class ArticleCreateFromEscaped {
  constructor(articleProvider, validation, score, searchDirectory) {
    this.articleDocumentCreate = new DocumentCreateUsecase(articleProvider, score);
    this.install = new InstallUsecase(searchDirectory);

    this.validation = validation;

    this.run = this.run.bind(this);
  }
  run(quote) {
    const self = this;
    return self.validation.quote.run(quote)
      .then(({ validatedQuote, invalidReasons }) => {
        if (invalidReasons && invalidReasons.size > 0) { 
          return Promise.reject({ message: 'Quote is invalid', invalidReasons });
        } else {
          return Promise.resolve(validatedQuote);
        }
      })
      .then(validatedQuote => self.articleDocumentCreate.run(validatedQuote))
      .then(articleId => self.install.run(articleId));
  }
}
