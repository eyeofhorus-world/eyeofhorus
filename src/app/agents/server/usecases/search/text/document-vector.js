
import lunr from 'lunr';

import PromiseGroup from '../../../../../utilities/promise-group';

import wordSelectors from '../../../entities/word';
import documentTagSelectors from '../../../entities/document-tag';

export default class SearchTextDocumentVector {
  constructor(corpusProvider, documentTagProvider, relevanceProvider) {
    this.corpusProvider = corpusProvider;
    this.documentTagProvider = documentTagProvider;
    this.relevanceProvider = relevanceProvider;

    this.run = this.run.bind(this);
    this.wordFrequencyVector = this.wordFrequencyVector.bind(this);
    this.relevancyVector = this.relevancyVector.bind(this);
  }
  run(queryWords, documentImmutable) {
    const self = this;
    
    const documentMutable = documentImmutable.toJS();
    const documentId = documentTagSelectors.documentId.get(documentMutable);
    const documentType = documentTagSelectors.documentType.get(documentMutable);

    return self.documentTagProvider.findAllTagsInDocument(documentType, documentId).then((documentTags) => {
      const promiseGroup = new PromiseGroup();

      let wordFrequency = null;
      promiseGroup.add(self.wordFrequencyVector(documentTags).then((vector) => {
        if (vector) {
          wordFrequency = vector;
        }
        return Promise.resolve({});
      }));

      let relevancy = 0;
      promiseGroup.add(self.relevancyVector(queryWords, documentTags).then((vector) => {
        if (vector > 0) {
          relevancy = vector;
        }
        return Promise.resolve({});
      }));

      return promiseGroup.finishAll().then(() => {
        if (wordFrequency) {
          return Promise.resolve({ wordFrequency, relevancy });
        } else {
          return Promise.resolve({});
        }
      });
    });
  }
  wordFrequencyVector(documentTags) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    const vector = new lunr.Vector();
    (documentTags || []).forEach((documentTag) => {
      const documentTagValue = documentTagSelectors.tagValue.get(documentTag);
      const documentTermFrequency = documentTagSelectors.documentTermFrequency.get(documentTag);
      promiseGroup.add(self.corpusProvider.findWithValue(documentTagValue).then((word) => {
        const wordPosition = wordSelectors.position.get(word);
        const wordInverseDocumentFrequency = wordSelectors.inverseDocumentFrequency.get(word);
        if (word) {
          vector.insert(
            wordPosition, 
            documentTermFrequency * wordInverseDocumentFrequency);
        }
        return Promise.resolve({});
      }));
    });
    return promiseGroup.finishAll().then(() => Promise.resolve(vector));
  }
  relevancyVector(queryWords, documentTags) {
    const self = this;
    const tags = documentTags.map(documentTag => documentTagSelectors.tagValue.get(documentTag));
    return self.relevanceProvider.relevanceOfWordToWords(tags, queryWords).then((relevancyScore) => {
      let relevanceScoreScaled = 1 - (1 / Math.log(relevancyScore + 2));
      if (relevanceScoreScaled < 0 || Number.isNaN(relevanceScoreScaled) || Number.isFinite(relevanceScoreScaled) !== true) {
        relevanceScoreScaled = 0;
      }
      return Promise.resolve(relevanceScoreScaled);
    });
  }
}
