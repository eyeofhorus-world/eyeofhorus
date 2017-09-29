
import React from 'react';

import strings from '../../framework/config/strings';
import typefaces from '../../framework/config/typefaces';
import palette from '../../framework/config/palette';
import dimens from '../../framework/config/dimens';

import Rectangle from '../atoms/rectangle';
import Label from '../atoms/label';
import Container from '../atoms/container';

class Donate extends React.Component {
  render() {
    return (
      <Rectangle style={Object.assign({}, typefaces.robotoRegular12, {
        display: 'flex',
        justifyContent: 'center',
        color: palette.nickel,
      }, this.props.style || {})}>
        <Container style={{
          textAlign: 'center',
          marginTop: dimens.pixels16,
          marginBottom: dimens.pixels16,
        }}>
          <Label value={strings.donateLine0}/>
          <Label value={strings.donateLine1} style={{
            marginTop: dimens.pixels2,
          }}/>
          <Label value={strings.donateLine2} style={Object.assign({}, typefaces.robotoMonoLightItalic11Nickel, {
            marginTop: dimens.pixels2,
          })}/>
        </Container>
      </Rectangle>
    );
  }
}

Donate.propTypes = {
  style: React.PropTypes.object,
};

export default Donate;
