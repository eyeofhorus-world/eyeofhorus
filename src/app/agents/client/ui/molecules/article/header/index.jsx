
import { connect } from 'react-redux';

import { selectors as searchSelectors } from '../../../../framework/ducks/search';

import View from './view';

const mapStateToProps = state => ({
  showingMostRecent: searchSelectors.isShowingMostRecent(state) === true,
  showingSearchButton: searchSelectors.shouldSearchQuery(state) === true,
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
