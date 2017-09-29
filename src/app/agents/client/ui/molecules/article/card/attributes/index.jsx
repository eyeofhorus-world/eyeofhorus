
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  attributes: articlesSelectors.valueAttributes(ownProps.value).map(value => ({
    key: articlesSelectors.attributeId(value),
    value,
  })),
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
