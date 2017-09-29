
import { connect } from 'react-redux';

import { actions as articlesActions, selectors as articlesSelectors } from '../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  fulfillmentType: articlesSelectors.scoreFulfillmentType(ownProps.value),
  descriptionType: articlesSelectors.scoreDescriptionType(ownProps.value),
  upVoteCount: articlesSelectors.scoreUpVoteCount(ownProps.value),
  downVoteCount: articlesSelectors.scoreDownVoteCount(ownProps.value),
  upVoted: articlesSelectors.scoreUpVoted(ownProps.value),
  downVoted: articlesSelectors.scoreDownVoted(ownProps.value),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onDownVoteInteracted: () => {
      dispatch((ignored, getState) => {
        articlesActions.onDownVote(dispatch, getState, ownProps.usecases, ownProps.value);
      });
    },
    onUpVoteInteracted: () => {
      dispatch((ignored, getState) => {
        articlesActions.onUpVote(dispatch, getState, ownProps.usecases, ownProps.value);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
