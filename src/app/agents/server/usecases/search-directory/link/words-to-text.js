
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import Translate from './translate';

export default class SearchDirectoryLinkText {
  constructor(relevanceProvider) {
    this.relevanceProvider = relevanceProvider;
    
    this.translate = new Translate();

    this.run = this.run.bind(this);
    this.translateText = this.translateText.bind(this);
    this.addLinks = this.addLinks.bind(this);
  }
  run(words, textUnescaped, relationIncrementQuantity) {
    const self = this;
    return self.translateText(textUnescaped)
      .then(textTranslated => self.addLinks(words, textTranslated, relationIncrementQuantity));
  }
  translateText(textUnescaped) {
    return this.translate.run(textUnescaped);
  }
  addLinks(contextWords, textWords, relationIncrementQuantity) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    (contextWords || Immutable.fromJS([])).forEach((contextWord) => {
      (textWords || Immutable.fromJS([])).forEach((textWord) => {
        promiseGroup.add(self.relevanceProvider.incrementRelevance(contextWord, textWord, relationIncrementQuantity));
      });
    });
    return promiseGroup.finishAll();
  }
}
