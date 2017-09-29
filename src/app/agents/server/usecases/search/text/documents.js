
import Immutable from 'immutable';

import PromiseGroup from '../../../../../utilities/promise-group';

import wordSelectors from '../../../entities/word';
import documentTagSelectors from '../../../entities/document-tag';

export default class SearchTextDocuments {
  constructor(documentTagProvider) {
    this.documentTagProvider = documentTagProvider;

    this.run = this.run.bind(this);
  }
  run(words) {
    const self = this;
    const promiseGroup = new PromiseGroup();
    const documentSet = [];
    (words || Immutable.fromJS([])).forEach((likeWord) => {
      const likeWordValue = wordSelectors.value.get(likeWord.toJS());
      promiseGroup.add(self.documentTagProvider.findAllWithTagValue(likeWordValue).then((documentTags) => {
        (documentTags || []).forEach((documentTagMutable) => {
          const documentTagDocumentId = documentTagSelectors.documentId.get(documentTagMutable);
          const documentTagDocumentType = documentTagSelectors.documentType.get(documentTagMutable);
          
          const isDocumentAlreadyInTheSet = documentSet.some((insertedDocument) => {
            const insertedDocumentDocumentId = documentTagSelectors.documentId.get(insertedDocument);
            const insertedDocumentDocumentType = documentTagSelectors.documentType.get(insertedDocument);
            return (insertedDocumentDocumentId === documentTagDocumentId && 
              insertedDocumentDocumentType === documentTagDocumentType);
          });
  
          if (isDocumentAlreadyInTheSet !== true) {
            documentSet.push(documentTagMutable);
          }
        });
        return Promise.resolve({});
      }));
    });
    return promiseGroup.finishAll({ unbox: true, noreject: true })
      .then(() => Promise.resolve(Immutable.fromJS(documentSet)));
  }
}
