
export const documentTagDocumentTypes = {
  article: 'article',

  asArray: ['article'],
};

export const schema = {
  documentTypes: documentTagDocumentTypes,
};

export default {
  isWellFormed: document => !!(document && document._id), // eslint-disable-line no-underscore-dangle

  id: {
    get: document => (document || {})._id, // eslint-disable-line no-underscore-dangle
  },
  tagValue: {
    get: document => (document || {}).tagValue,
  },
  documentId: {
    get: document => (document || {}).documentId,
  },
  documentType: {
    get: document => (document || {}).documentType,
  },
  documentTermFrequency: {
    get: document => (document || {}).documentTermFrequency,
  },
};
