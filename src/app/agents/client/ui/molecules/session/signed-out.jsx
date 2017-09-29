
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
      <Rectangle className="session-signed-out" style={Object.assign({}, {
        height: dimens.pixels40,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }, this.props.style || {})} onInteract={this.props.onInteract}>
        <style>{`
          .session-signed-out {
            transition: background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            background-color: ${palette.transparent};
            font-family: ${typefaces.robotoRegular14.fontFamily};
            font-size: ${typefaces.robotoRegular14.fontSize};
            color: ${typefaces.blackOlive};
          }
          .session-signed-out:hover {
            background-color: ${palette.transparent};
            font-family: ${typefaces.robotoRegular14.fontFamily};
            font-size: ${typefaces.robotoRegular14.fontSize};
            color: ${palette.nickel};
          }
        `}</style>
        <Container style={{
          width: dimens.percent100,
          marginLeft: dimens.pixels16,
        }}>
          <Label className="unselectable" value={strings.signIn} style={{
            display: 'inline-block',
            float: 'right',
            marginRight: dimens.pixels16,
          }}/>
        </Container>
      </Rectangle>
    );
  }
}

SessionSignedIn.propTypes = {
  style: React.PropTypes.object,
  onInteract: React.PropTypes.func,
};

export default SessionSignedIn;
