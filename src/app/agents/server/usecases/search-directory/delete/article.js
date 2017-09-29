
import { schema as documentTagSchema } from '../../../entities/document-tag';

export default class SearchIndexAddArticleUsecase {
  constructor(documentTagProvider) {
    this.documentTagProvider = documentTagProvider;

    this.run = this.run.bind(this);
  }
  run(articleId) {
    return this.documentTagProvider.removeDocumentTags(documentTagSchema.documentTypes.article, articleId);
  }
}
