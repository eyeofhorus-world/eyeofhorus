
import { connect } from 'react-redux';

import { actions as articlesActions, selectors as articlesSelectors } from '../../../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  showMore: articlesSelectors.valueAreThereMoreAttributes(ownProps.value),
  inProgress: articlesSelectors.valueIsShowingMoreAttributesInProgress(ownProps.value),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onShowMore: () => {
      articlesActions.onShowMoreAttributes(dispatch, ownProps.usecases, ownProps.value);
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
