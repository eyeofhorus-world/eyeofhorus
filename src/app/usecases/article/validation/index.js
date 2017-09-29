
import ArticleQuoteValidationNameUsecase from './quote';

export default () => {
  const quote = new ArticleQuoteValidationNameUsecase();

  return ({
    quote,
  });
};
