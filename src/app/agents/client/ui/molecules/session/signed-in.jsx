
import React from 'react';

import strings from '../../../framework/config/strings';
import typefaces from '../../../framework/config/typefaces';
import palette from '../../../framework/config/palette';
import dimens from '../../../framework/config/dimens';
import animations from '../../../framework/config/animations';

import Rectangle from '../../atoms/rectangle';
import Label from '../../atoms/label';
import Container from '../../atoms/container';

class SessionSignedIn extends React.Component {
  render() {
    return (
      <Rectangle className="session-signed-in" style={Object.assign({}, {
        height: dimens.pixels40,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }, this.props.style || {})} onInteract={this.props.onInteract}>
        <style>{`
          .session-signed-in {
            transition: background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            background-color: ${palette.transparent};
            font-family: ${typefaces.robotoRegular14.fontFamily};
            font-size: ${typefaces.robotoRegular14.fontSize};
            color: ${palette.blackOlive};
          }
          .session-signed-in:hover {
            background-color: ${palette.transparent};
            font-family: ${typefaces.robotoRegular14.fontFamily};
            font-size: ${typefaces.robotoRegular14.fontSize};
            color: ${palette.nickel};
          }
        `}</style>
        <Container style={{
          width: dimens.percent100,
          textAlign: 'right',
        }}>
          <Label className="unselectable" value={`${strings.welcomeUser}${this.props.username}`} ellipsize={true} style={{
            maxWidth: dimens.pixels220,
          }}/>
        </Container>
      </Rectangle>
    );
  }
}

SessionSignedIn.propTypes = {
  style: React.PropTypes.object,
  username: React.PropTypes.string,
  onInteract: React.PropTypes.func,
};

export default SessionSignedIn;
