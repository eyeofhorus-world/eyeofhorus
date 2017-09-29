
import wordSelectors from '../../../entities/word';
import documentTagSelectors from '../../../entities/document-tag';

const logProfilingMessages = false;

export default class SearchIndexCorpusBuildUsecase {
  constructor(articleProvider, documentTagProvider, corpusProvider, searchIndexState) {
    this.articleProvider = articleProvider;
    this.documentTagProvider = documentTagProvider;
    this.corpusProvider = corpusProvider;
    this.searchIndexState = searchIndexState;

    this.run = this.run.bind(this);
    this.deleteEverythingInTheCorpus = this.deleteEverythingInTheCorpus.bind(this);
    this.addEveryUniqueTagInDocumentsToTheCorpus = this.addEveryUniqueTagInDocumentsToTheCorpus.bind(this);
    this.countNumberOfDocuments = this.countNumberOfDocuments.bind(this);
    this.setMetaDataForEachWord = this.setMetaDataForEachWord.bind(this);
  }
  run() {
    const self = this;
    return self.searchIndexState.inProgress.run(() => {
      const t0 = process.hrtime();
      if (logProfilingMessages === true) {
        console.log('building corpus...'); // eslint-disable-line no-console
      }
      
      return self.deleteEverythingInTheCorpus()
        .then(() => self.addEveryUniqueTagInDocumentsToTheCorpus())
        .then(() => self.countNumberOfDocuments())
        .then(numberOfDocuments => self.setMetaDataForEachWord(numberOfDocuments))

        .then(() => {
          if (logProfilingMessages === true) {
            const t1 = process.hrtime(t0);
            console.log(`corpus built in ${t1[0]}s ${t1[1] / 1000000}ms.`); // eslint-disable-line no-console 
          }
          return Promise.resolve({});
        });
    });
  }
  deleteEverythingInTheCorpus() {
    return this.corpusProvider.deleteAllWords();
  }
  addEveryUniqueTagInDocumentsToTheCorpus() {
    const self = this;
    return self.documentTagProvider.forEachDocumentTag(
      (documentTag) => {
        const documentTagValue = documentTagSelectors.tagValue.get(documentTag);
        if (documentTagValue && documentTagValue.length > 0) {
          return self.corpusProvider.createWord(documentTagValue);
        } else {
          return Promise.resolve({});
        }
      });
  }
  countNumberOfDocuments() {
    const self = this;
    return self.articleProvider.getArticleCount();
  }
  setMetaDataForEachWord(numberOfDocuments) {
    const self = this;
    let position = 0;
    return this.corpusProvider.forEachWordSortedAlphabetically((word) => {
      const wordId = wordSelectors.id.get(word);
      const wordValue = wordSelectors.value.get(word);

      const corpusPosition = position;
      position += 1;

      return self.corpusProvider.updatePositionOfWord(wordId, corpusPosition)
        .then(() => self.documentTagProvider.howManyDocumentsContainTag(wordValue))
        .then((documentFrequency) => {
          let idf = 1;
          if (documentFrequency > 0) {
            idf = 1 + Math.log(numberOfDocuments / documentFrequency);
          }
          return self.corpusProvider.updateIdfOfWord(wordId, idf);
        });
    });
  }
}
