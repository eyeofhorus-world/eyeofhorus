
import React from 'react';

import Container from '../container';

class HorizontalLayout extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

HorizontalLayout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default HorizontalLayout;
