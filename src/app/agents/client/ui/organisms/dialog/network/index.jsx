
import { connect } from 'react-redux';

import { actions as networkActions } from '../../../../framework/ducks/network';

import View from './view';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  actions: {
    onBack: () => {
      dispatch((ignored, getState) => {
        networkActions.onHideNetworkTroubleWarning(dispatch, getState);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
