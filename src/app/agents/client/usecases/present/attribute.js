
import Immutable from 'immutable';

import { unescape } from '../../../../helpers/string-helpers';

export default class PresentAttribute {
  constructor(score) {
    this.score = score;
    
    this.run = this.run.bind(this);
    this.convertId = this.convertId.bind(this);
    this.convertQuote = this.convertQuote.bind(this);
    this.converScore = this.converScore.bind(this);
  }
  run(attributeData) {
    const self = this;
    return Promise.resolve(attributeData || Immutable.fromJS({}))
      .then(attribute => self.convertId(attribute))
      .then(attribute => self.convertQuote(attribute))
      .then(attribute => self.converScore(attribute));
  }
  convertId(result) {
    return Promise.resolve(result);
  }
  convertQuote(result) {
    return Promise.resolve(result.set('quote', 
      unescape(result.get('quote') || '')));
  }
  converScore(attribute) {
    return this.score.run(attribute.get('score')).then(
      scorePresentable => Promise.resolve(
        attribute.delete('score').set('score', scorePresentable)));
  }
}
