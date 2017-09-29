
import Immutable from 'immutable';
import lunr from 'lunr';

import arrayHelpers from '../../../../../helpers/array-helpers';

const splitRegex = /[\s\-]+/; // eslint-disable-line no-useless-escape

const pipeline = new lunr.Pipeline();

pipeline.add(
  lunr.trimmer,
  lunr.stopWordFilter,
  lunr.stemmer);

export default class SearchTextQueryProcessor {
  constructor() {
    this.run = this.run.bind(this);
  }
  run(query) {
    return Promise.resolve(Immutable.fromJS(pipeline.run(arrayHelpers.filterNulls([].concat.apply([], [
      (query || '').toString().trim().toLowerCase().split(splitRegex)]))) || []));
  }
}
