
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  quote: articlesSelectors.valueQuote(ownProps.value),
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
