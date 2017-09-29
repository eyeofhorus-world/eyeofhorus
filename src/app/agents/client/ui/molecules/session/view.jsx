
import React from 'react';

import SessionSignedIn from './signed-in';
import SessionSignedOut from './signed-out';

class Session extends React.Component {
  render() {
    if (this.props.isSignedIn) {
      return (
        <SessionSignedIn style={Object.assign({}, {
        }, this.props.style || {})} username={this.props.displayName} 
          onInteract={this.props.actions.signOut}/>
      );
    } else {
      return (
        <SessionSignedOut style={Object.assign({}, {
        }, this.props.style || {})} onInteract={this.props.actions.signIn}/>
      );
    }
  }
}

Session.propTypes = {
  style: React.PropTypes.object,

  isSignedIn: React.PropTypes.bool,
  displayName: React.PropTypes.string,

  actions: React.PropTypes.shape({
    signIn: React.PropTypes.func,
    signOut: React.PropTypes.func,
  }),
};

export default Session;
