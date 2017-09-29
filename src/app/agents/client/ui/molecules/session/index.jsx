
import { connect } from 'react-redux';

import { actions as userActions, selectors as userSelectors } from '../../../framework/ducks/user';

import View from './view';

const mapStateToProps = state => ({
  isSignedIn: userSelectors.isSignedIn(state),
  displayName: userSelectors.displayName(state),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn: () => {
      dispatch((ignored, getState) => {
        userActions.wantsToSignIn(getState);
      });
    },
    signOut: () => {
      dispatch((ignored, getState) => {
        userActions.wantsToSignOut(getState);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
