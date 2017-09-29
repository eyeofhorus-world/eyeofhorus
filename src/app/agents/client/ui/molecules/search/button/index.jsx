
import { connect } from 'react-redux';

import { selectors as searchSelectors, actions as searchActions } from '../../../../framework/ducks/search';

import View from './view';

const mapStateToProps = state => ({
  canRetry: searchSelectors.canRetry(state),
  showSearchButton: searchSelectors.shouldSearchQuery(state) === true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onSearch: () => {
      dispatch((ignored, getState) => {
        searchActions.onSearch(dispatch, getState, ownProps.usecases, ownProps.router);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
