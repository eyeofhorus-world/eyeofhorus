
export default {
  isWellFormed: document => !!(document && document._id), // eslint-disable-line no-underscore-dangle

  id: {
    get: document => (document || {})._id, // eslint-disable-line no-underscore-dangle
  },
  value: {
    get: document => (document || {}).value,
  },
  position: {
    get: document => (document || {}).position,
  },
  inverseDocumentFrequency: {
    get: document => (document || {}).inverseDocumentFrequency,
  },
};
