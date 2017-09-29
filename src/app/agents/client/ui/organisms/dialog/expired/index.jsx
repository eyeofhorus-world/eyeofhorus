
import { connect } from 'react-redux';

import { actions as userActions } from '../../../../framework/ducks/user';

import View from './view';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  actions: {
    onBack: () => {
      userActions.onHideSessionExpiredWarning(dispatch);
    },
    onSignIn: () => {
      dispatch((ignored, getState) => {
        userActions.wantsToSignIn(getState);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
