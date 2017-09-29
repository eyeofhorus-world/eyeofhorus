
import React from 'react';

import Container from '../container';

class CenterHorizontallyLayout extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        justifyContent: 'center',
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

CenterHorizontallyLayout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default CenterHorizontallyLayout;
