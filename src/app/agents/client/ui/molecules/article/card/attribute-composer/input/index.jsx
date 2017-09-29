
import { connect } from 'react-redux';

import { selectors as userSelectors } from '../../../../../../framework/ducks/user';
import { selectors as articlesSelectors, actions as articlesActions } from '../../../../../../framework/ducks/articles';
import { selectors as networkSelectors } from '../../../../../../framework/ducks/network';

import View from './view';

const mapStateToProps = (state, ownProps) => ({
  blurInput: networkSelectors.isShowingAnyDialog(state) === true || userSelectors.isShowingAnyDialog(state) === true || articlesSelectors.valueIsAddingAttributeInProgress(ownProps.value) === true,
  disableInput: articlesSelectors.valueIsAddingAttributeInProgress(ownProps.value) === true,
  isValueInvalid: articlesSelectors.valueAttributeComposerIsValueInvalid(ownProps.value) === true,
  didFail: articlesSelectors.valueAddingAttributeFailed(ownProps.value) === true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onUserWantsToInputAttributeName: () => {
      dispatch((ignored, getState) => {
        articlesActions.onStartComposingAttribute(dispatch, getState);
      });
    },
    onChange: (value) => {
      dispatch((ignored, getState) => {
        articlesActions.onAddingAttributeValueChanged(dispatch, getState, ownProps.usecases, 
          ownProps.value, value);
      });
    },
    onAdd: (value) => {
      dispatch((ignored, getState) => {
        articlesActions.onAddAttribute(dispatch, getState, ownProps.usecases, 
          ownProps.value, value);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
