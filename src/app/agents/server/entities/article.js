
export default {
  id: {
    get: document => (document || {})._id, // eslint-disable-line no-underscore-dangle
  },
  quote: {
    get: document => (document || {}).quote,
  },
};
