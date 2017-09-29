
export default {
  id: {
    get: document => (document || {})._id, // eslint-disable-line no-underscore-dangle
  },
  contextType: {
    get: document => (document || {}).contextType,
  },
  contextId: {
    get: document => (document || {}).contextId,
  },
  subContextId: {
    get: document => (document || {}).subContextId,
  },
  up: {
    get: document => (document || {}).up,
  },
  down: {
    get: document => (document || {}).down,
  },
};
