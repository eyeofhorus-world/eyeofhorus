
import Immutable from 'immutable';

const errorTypes = {
  invalidValue: 'invalidValue',
  authentication: 'authentication',
  other: 'other',
};

export default class ArticleAddAttributeUsecase {
  constructor(articleProvider, validation, present) {
    this.errorTypes = errorTypes;

    this.articleProvider = articleProvider;
    this.validation = validation;
    this.present = present;

    this.run = this.run.bind(this);
  }
  run(userTrackingContext, articleQuote, attributeValue) {
    const self = this;
    return self.validation.quote.run(attributeValue).then(
      ({ invalidReasons, validatedQuote }) => Promise.resolve({ invalidReasons, validatedQuote }),
      () => Promise.resolve({
        invalidReasons: Immutable.fromJS([
          self.validation.quote.reasonTypes.NEEDS_TO_HAVE_CONTENT,
        ]),
      })).then(({ invalidReasons, validatedQuote }) => {  
        if (invalidReasons && invalidReasons.size > 0) {
          return Promise.reject({ type: errorTypes.invalidValue, reasons: invalidReasons });
        } else {
          return Promise.resolve(validatedQuote);
        }
      }).then(quote => self.articleProvider.addAttribute(articleQuote, quote, userTrackingContext.toJS())
          .then((valueMutable) => {
            if (valueMutable) {
              const value = Immutable.fromJS(valueMutable);
              if ((value.get('_id') || '').length === '59bbaf06b2360989b1b42994'.length) {
                return self.present.attribute.run(value);
              } else {
                return Promise.reject({ type: errorTypes.other });
              }
            } else {
              return Promise.reject({ type: errorTypes.other });
            }
          }, (error) => {
            if (self.articleProvider.isAuthenticationError(error)) {
              return Promise.reject({ type: errorTypes.authentication });
            } else {
              return Promise.reject({ type: errorTypes.other });
            }
          }));
  }
}
