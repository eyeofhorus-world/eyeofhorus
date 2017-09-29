
import React from 'react';

import strings from '../../framework/config/strings';
import typefaces from '../../framework/config/typefaces';
import palette from '../../framework/config/palette';

import Label from '../atoms/label';
import Container from '../atoms/container';

class Copyright extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, typefaces.robotoLight10, {
        color: palette.blackOlive,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }, this.props.style || {})}>
        <Label value={strings.copyrightLine0}/>
        <Label value={strings.copyrightLine1}/>
      </Container>
    );
  }
}

Copyright.propTypes = {
  style: React.PropTypes.object,
};

export default Copyright;
