
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = state => ({
  isLoading: articlesSelectors.isLoading(state) === true,
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
