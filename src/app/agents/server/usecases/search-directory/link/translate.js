
import Immutable from 'immutable';
import lunr from 'lunr';

import arrayHelpers from '../../../../../helpers/array-helpers';

const splitRegex = /[\s\-]+/; // eslint-disable-line no-useless-escape

const pipeline = new lunr.Pipeline();

pipeline.add(
  lunr.trimmer,
  lunr.stopWordFilter,
  lunr.stemmer);

export default class Translate {
  constructor() {
    this.run = this.run.bind(this);
  }
  run(input) {
    const self = this;
    return self.trimAndSplit(input).then(
      words => self.simplify(words)).then(
      words => self.setify(words));
  }
  trimAndSplit(text) {
    const quoteTags = (text || '').toString().trim().split(splitRegex);
    return Promise.resolve(Immutable.fromJS(
      arrayHelpers.filterNulls([].concat.apply([], [quoteTags])) || []));
  }
  simplify(tags) {
    return Promise.resolve(Immutable.fromJS(
      pipeline.run((tags || Immutable.fromJS([]))
        .map(tag => tag.toLowerCase())
        .toJS()) || []));
  }
  setify(tags) {
    return Promise.resolve(Immutable.fromJS([...new Set((tags || Immutable.fromJS([])).toJS())]));
  }
}
