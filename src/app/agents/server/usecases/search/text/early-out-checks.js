
import Immutable from 'immutable';

export default class SearchTextEarlyOutChecks {
  constructor(corpusProvider) {
    this.corpusProvider = corpusProvider;

    this.run = this.run.bind(this);
  }
  run(queryTokens) {
    return this.corpusProvider.doAnyOfTheseWordsExist((queryTokens || Immutable.fromJS([])).toJS());
  }
}
