
import lunr from 'lunr';

import wordSelectors from '../../../entities/word';

export default class SearchTextQueryVector {
  constructor() {
    this.run = this.run.bind(this);
  }
  run(queryWords, likeWords) {
    const tf = 1 / queryWords.size;
    const wordFrequency = new lunr.Vector();
    const relevancy = 1;
    likeWords.forEach((likeWordImmutable) => {
      const likeWordMutable = likeWordImmutable.toJS();

      const likeWordPosition = wordSelectors.position.get(likeWordMutable);
      const likeWordInverseDocumentFrequency = wordSelectors.inverseDocumentFrequency.get(likeWordMutable);
      const likeWordSimilarityBoost = likeWordMutable.similarityBoost;

      wordFrequency.insert(
        likeWordPosition,
        tf * likeWordInverseDocumentFrequency * likeWordSimilarityBoost);
    });
    return Promise.resolve({ wordFrequency, relevancy });
  }
}
