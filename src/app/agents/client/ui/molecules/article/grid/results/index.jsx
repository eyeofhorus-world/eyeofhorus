
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = state => ({
  articles: articlesSelectors.values(state).map(value => ({
    key: articlesSelectors.valueId(value),
    value,
    estimatedSize: articlesSelectors.valueEstimatedSize(value),
  })),
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
