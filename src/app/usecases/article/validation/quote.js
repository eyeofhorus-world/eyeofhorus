
import Immutable from 'immutable';

import { trimWhitespace } from '../../../helpers/string-helpers';

export const reasonTypes = {
  NEEDS_TO_HAVE_CONTENT: 0,
  HAS_INVALID_CHARACTERS: 1,
  CONTENT_TOO_LONG: 2,
  NO_CONTENT_AT_ALL: 3,
};

export default class IsArticleQuoteValidUsecase {
  constructor() {
    this.reasonTypes = reasonTypes;

    this.run = this.run.bind(this);
  }
  run(quote) {
    return new Promise((resolve) => {
      let validatedQuote = quote;
      const invalidReasons = [];

      if (!validatedQuote || validatedQuote.length === 0) {
        invalidReasons.push(reasonTypes.NO_CONTENT_AT_ALL);
      } else {
        const trimmedQuote = trimWhitespace(validatedQuote);
        if (trimmedQuote && trimmedQuote.length > 0) {
          validatedQuote = trimmedQuote;
        } else {
          invalidReasons.push(reasonTypes.NEEDS_TO_HAVE_CONTENT);
        }

        if (validatedQuote.length > 414) {
          invalidReasons.push(reasonTypes.CONTENT_TOO_LONG);
        }
      }

      resolve({ 
        invalidReasons: Immutable.fromJS(invalidReasons), 
        validatedQuote, 
      });
    });
  }
}
