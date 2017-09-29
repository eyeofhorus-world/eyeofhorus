
import React from 'react';

import Container from '../container';

class CenterLayout extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

CenterLayout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default CenterLayout;
