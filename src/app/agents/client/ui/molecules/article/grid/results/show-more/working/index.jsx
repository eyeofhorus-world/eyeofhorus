
import React from 'react';

import dimens from '../../../../../../../framework/config/dimens';

import Container from '../../../../../../atoms/container';
import Refresh from '../../../../../../atoms/refresh';

class Working extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        minWidth: dimens.pixels128,
        height: dimens.pixels36,
        maxHeight: dimens.pixels36,
        marginTop: dimens.pixels16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }, this.props.style || {})}>
        <Refresh style={{
          marginTop: dimens.pixels4,
          marginBottom: dimens.pixels4,
        }}/>
      </Container>
    );
  }
}

export default Working;
