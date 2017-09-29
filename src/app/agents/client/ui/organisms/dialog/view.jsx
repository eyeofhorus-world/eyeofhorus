
import React from 'react';

import Expired from './expired';
import Required from './required';
import Network from './network';

class Dialog extends React.Component {
  render() {
    if (this.props.showSessionExpired === true) {
      return (
        <Expired/>
      );
    } else if (this.props.showNeedToSignIn === true) {
      return (
        <Required/>
      );
    } else if (this.props.showNetworkTrouble) {
      return (
        <Network/>
      );
    } else {
      return null;
    }
  }
}

Dialog.propTypes = {
  showNeedToSignIn: React.PropTypes.bool,
  showSessionExpired: React.PropTypes.bool,
  showNetworkTrouble: React.PropTypes.bool,
};

export default Dialog;
