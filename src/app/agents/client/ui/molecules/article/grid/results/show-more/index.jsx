
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../../../framework/ducks/articles';
import { actions as searchActions } from '../../../../../../framework/ducks/search';

import View from './view';

const mapStateToProps = state => ({
  isThereMoreToShow: articlesSelectors.isThereMore(state),
  didFail: articlesSelectors.didLoadingMoreFail(state),
  inProgress: articlesSelectors.isLoadingMore(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onShowMore: () => {
      dispatch((ignored, getState) => {
        searchActions.onShowMore(dispatch, getState, ownProps.usecases);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
