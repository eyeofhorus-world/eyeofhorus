
import React from 'react';

import Container from '../container';

class VerticalLayout extends React.Component {
  render() {
    return (
      <Container className={`${this.props.className || ''}`} style={Object.assign({}, {
      }, this.props.style || {})}>
        {this.props.children}
      </Container>
    );
  }
}

VerticalLayout.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default VerticalLayout;

