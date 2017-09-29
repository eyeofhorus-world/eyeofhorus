
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import wordSelectors from '../../../entities/word';

import LikeWords from './like-words';
import Documents from './documents';
import QueryVector from './query-vector';
import DocumentVector from './document-vector';

export default class SearchTextSearch {
  constructor(corpusProvider, documentTagProvider, relevanceProvider) {
    this.likeWords = new LikeWords(corpusProvider);
    this.documents = new Documents(documentTagProvider);
    this.queryVector = new QueryVector();
    this.documentVector = new DocumentVector(corpusProvider, documentTagProvider, relevanceProvider);

    this.run = this.run.bind(this);
  }
  run(queryTokens) {
    const self = this;
    return Promise.resolve(queryTokens || Immutable.fromJS([]))

      .then(query => self.likeWords.run(query)
        .then(likeWords => Promise.resolve({ query, likeWords })))

      .then(({ query, likeWords }) => {
        const promiseGroup = new PromiseGroup();

        let documents = null;
        promiseGroup.add(self.documents.run(likeWords).then((documentSet) => {
          if (documentSet) {
            documents = documentSet;
          }
          return Promise.resolve({});
        }));

        let queryVector = null;
        promiseGroup.add(self.queryVector.run(query, likeWords).then((vector) => {
          if (vector) {
            queryVector = vector;
          }
          return Promise.resolve({});
        }));
        
        return promiseGroup.finishAll().then(() => Promise.resolve({ likeWords, queryVector, documents }));
      })

      .then(({ likeWords, queryVector, documents }) => {
        const likeWordsFlattened = (likeWords || Immutable.fromJS({})).toJS().map(
          likeWord => wordSelectors.value.get(likeWord));

        const promiseGroup = new PromiseGroup();
        const documentVectors = [];
        (documents || []).forEach((documentImmutable) => {
          promiseGroup.add(self.documentVector.run(likeWordsFlattened, documentImmutable).then((vector) => {
            if (vector) {
              documentVectors.push(Object.assign({}, { documentImmutable }, { vector }));
            }
            return Promise.resolve({});
          }));
        });
        return promiseGroup.finishAll().then(() => Promise.resolve({ queryVector, documentVectors }));
      })

      .then(({ queryVector, documentVectors }) => Immutable.fromJS(documentVectors
        .map(ref => ({ 
          ref: ref.documentImmutable, 
          score: (queryVector.wordFrequency.similarity(ref.vector.wordFrequency) 
            + ref.vector.relevancy),
        }))
        .sort((a, b) => (b.score - a.score))));
  }
}
