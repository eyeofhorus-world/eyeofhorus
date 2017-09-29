
import Immutable from 'immutable';

import { trimWhitespace } from '../../../helpers/string-helpers';

export const reasonTypes = {
  NEEDS_TO_HAVE_CONTENT: 0,
  HAS_INVALID_CHARACTERS: 1,
  NO_CONTENT_AT_ALL: 3,
};

export default class IsQueryValidUsecase {
  constructor() {
    this.reasonTypes = reasonTypes;

    this.run = this.run.bind(this);
  }
  run(query) {
    return new Promise((resolve) => {
      let validatedQuery = query;
      const invalidReasons = [];

      if (!validatedQuery || validatedQuery.length === 0) {
        invalidReasons.push(reasonTypes.NO_CONTENT_AT_ALL);
      } else {
        const trimmedQuote = trimWhitespace(validatedQuery);
        if (trimmedQuote && trimmedQuote.length > 0) {
          validatedQuery = trimmedQuote;
        } else {
          invalidReasons.push(reasonTypes.NEEDS_TO_HAVE_CONTENT);
        }
      }

      resolve({ 
        invalidReasons: Immutable.fromJS(invalidReasons), 
        validatedQuery, 
      });
    });
  }
}
