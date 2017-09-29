
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../framework/ducks/articles'; // eslint-disable-line no-unused-vars

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  failed: articlesSelectors.valueAddingAttributeFailed(ownProps.value) || 
    articlesSelectors.valueAttributeShowMoreFailed(ownProps.value),
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
