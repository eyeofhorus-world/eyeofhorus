
import { connect } from 'react-redux';

import { selectors as userSelectors } from '../../../framework/ducks/user';
import { selectors as networkSelectors } from '../../../framework/ducks/network';

import View from './view';

const mapStateToProps = state => ({
  showNeedToSignIn: userSelectors.showNeedToSignIn(state),
  showSessionExpired: userSelectors.showSessionExpired(state),
  showNetworkTrouble: networkSelectors.showNetworkWarning(state),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
