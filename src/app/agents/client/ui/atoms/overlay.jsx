
import React from 'react';

import dimens from '../../framework/config/dimens';

import Container from './container';

class Overlay extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        width: dimens.percent100,
        height: dimens.percent100,
        position: 'absolute',
        zIndex: dimens.pixels999i,
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

Overlay.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default Overlay;
