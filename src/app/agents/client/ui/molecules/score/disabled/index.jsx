
import { connect } from 'react-redux';

import { selectors as articlesSelectors } from '../../../../framework/ducks/articles';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  fulfillmentType: articlesSelectors.scoreFulfillmentType(ownProps.value),
  descriptionType: articlesSelectors.scoreDescriptionType(ownProps.value),
  upVoteCount: articlesSelectors.scoreUpVoteCount(ownProps.value),
  downVoteCount: articlesSelectors.scoreDownVoteCount(ownProps.value),
});

const mapDispatchToProps = () => ({
  actions: {
    onDownVoteInteracted: () => {
    },
    onUpVoteInteracted: () => {
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
