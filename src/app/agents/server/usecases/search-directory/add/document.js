
import Immutable from 'immutable';
import lunr from 'lunr';

import PromiseGroup from '../../../../../utilities/promise-group';

const pipeline = new lunr.Pipeline();

pipeline.add(
  lunr.trimmer,
  lunr.stopWordFilter,
  lunr.stemmer);

export default class SearchIndexAddDocumentUsecase {
  constructor(documentTagProvider) {
    this.documentTagProvider = documentTagProvider;

    this.run = this.run.bind(this);
    this.simplify = this.simplify.bind(this);
    this.setify = this.setify.bind(this);
    this.buildMetaData = this.buildMetaData.bind(this);
    this.insertAll = this.insertAll.bind(this);
  }
  run(documentType, documentId, documentTags = Immutable.fromJS([])) {
    const self = this;
    return self.simplify(documentTags)
      .then(tags => self.setify(tags))
      .then(({ tags, tagSet }) => self.buildMetaData(tags, tagSet))
      .then(tags => self.insertAll(documentType, documentId, tags));
  }
  simplify(tags) {
    return Promise.resolve(Immutable.fromJS(
      pipeline.run((tags || Immutable.fromJS([]))
        .map(tag => tag.toLowerCase())
        .toJS()) || []));
  }
  setify(tags) {
    return Promise.resolve({
      tags,
      tagSet: Immutable.fromJS([...new Set((tags || Immutable.fromJS([])).toJS())]),
    });
  }
  buildMetaData(tags, tagSet) {
    return Promise.resolve((tagSet || Immutable.fromJS([])).map((uniqueTag) => {
      let frequency = 0;
      (tags || Immutable.fromJS([])).forEach((tagValue) => {
        if (tagValue === uniqueTag) {
          frequency += 1;
        }
      });
      
      let tf = frequency / (tags || Immutable.fromJS([])).size;
      if (Number.isNaN(tf) || Number.isFinite(tf) !== true) {
        tf = 0;
      }
  
      return {
        value: uniqueTag,
        documentTermFrequency: tf,
      };
    }));
  }
  insertAll(documentType, documentId, documentTags) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    (documentTags || []).forEach((tag) => {
      promiseGroup.add(self.documentTagProvider.createDocumentTag(
        documentType, documentId, tag.value, tag.documentTermFrequency));
    });
    return promiseGroup.finishAll({ unbox: true, noreject: true });
  }
}
