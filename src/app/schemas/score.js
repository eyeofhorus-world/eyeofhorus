
export const scoreContextTypes = { // eslint-disable-line import/prefer-default-export
  articleAttribute: 'articleAttribute',
  articleTruthful: 'articleTruthful',

  asArray: ['articleAttribute', 'articleTruthful'],
};

export default {
  contextTypes: scoreContextTypes,
};
