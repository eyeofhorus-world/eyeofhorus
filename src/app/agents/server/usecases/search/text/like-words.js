
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import wordSelectors from '../../../entities/word';

export default class SearchTextLikeWords {
  constructor(corpusProvider) {
    this.corpusProvider = corpusProvider;

    this.run = this.run.bind(this);
    this.likeWords = this.likeWords.bind(this);
    this.tokenRelativeMetaData = this.tokenRelativeMetaData.bind(this);
    this.metaDatas = this.metaDatas.bind(this);
    this.flatten = this.flatten.bind(this);
  }
  run(words) {
    const self = this;
    return self.likeWords(words)
      .then(wordsWithLikeWords => self.metaDatas(wordsWithLikeWords))
      .then(results => self.flatten(results));
  }
  likeWords(words) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    const wordAndLikeWords = [];
    (words || []).forEach((word) => {
      promiseGroup.add(self.corpusProvider.findAllWordsWhichAreOrCanBeExpandedFromThisWord(word).then((likeWords) => {
        if (likeWords && likeWords.length > 0) {
          wordAndLikeWords.push({
            word,
            likeWords: Immutable.fromJS(likeWords),
          });
        }
        return Promise.resolve({});
      }));
    });

    return promiseGroup.finishAll()
      .then(() => Promise.resolve(Immutable.fromJS(wordAndLikeWords)));
  }
  tokenRelativeMetaData(token, likeWordBoxed) {
    const likeWord = likeWordBoxed.toJS();
    const likeWordValue = wordSelectors.value.get(likeWord);

    let similarityBoost = 1;
    if (likeWordValue !== token) {
      const diff = Math.max(3, likeWordValue.length - token.length);
      similarityBoost = 1 / Math.log(diff);
    }

    return Immutable.fromJS(Object.assign({}, likeWord, { similarityBoost }));
  }
  metaDatas(wordsWithLikeWords) {
    const self = this;
    return Promise.resolve(wordsWithLikeWords.map(result => result.set('likeWords', result.get('likeWords').map(
      likeWord => self.tokenRelativeMetaData(result.get('word'), likeWord)))));
  }
  flatten(results) {
    const likeWords = [];
    results.forEach((result) => {
      (result.get('likeWords') || []).forEach((likeWord) => {
        const value = wordSelectors.value.get(likeWord.toJS());
        const isRedundant = likeWords.some((insertedLikeWord) => {
          const insertedValue = wordSelectors.value.get(insertedLikeWord.toJS());
          return (insertedValue === value);
        });
        if (isRedundant !== true) {
          likeWords.push(likeWord);
        }
      });
    });
    return Promise.resolve(Immutable.fromJS(likeWords));
  }
}
