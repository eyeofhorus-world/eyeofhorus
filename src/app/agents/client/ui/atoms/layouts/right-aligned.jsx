
import React from 'react';

import Container from '../container';

class RightAlignedLayout extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        flexDirection: 'row-reverse',
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

RightAlignedLayout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default RightAlignedLayout;
