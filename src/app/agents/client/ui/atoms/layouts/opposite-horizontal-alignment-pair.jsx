
import React from 'react';

import Container from '../container';

class OppositeHorizontalAlignmentPair extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
      }, this.props.style || {})}>
        {this.props.leftAligned()}
        {this.props.rightAligned()}
      </Container>
    );
  }
}

OppositeHorizontalAlignmentPair.propTypes = {
  style: React.PropTypes.object,

  leftAligned: React.PropTypes.func,
  rightAligned: React.PropTypes.func,
};

export default OppositeHorizontalAlignmentPair;
