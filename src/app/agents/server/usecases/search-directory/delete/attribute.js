
import { schema as documentTagSchema } from '../../../entities/document-tag';

export default class SearchIndexDeleteAttribute {
  constructor(documentTagProvider) {
    this.documentTagProvider = documentTagProvider;

    this.run = this.run.bind(this);
  }
  run(attributeId) {
    return this.documentTagProvider.removeDocumentTags(documentTagSchema.documentTypes.attribute, attributeId);
  }
}
