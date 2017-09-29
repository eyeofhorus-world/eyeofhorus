
import React from 'react';

import Enabled from './enabled';
import Disabled from './disabled';

class Score extends React.Component {
  render() {
    if (this.props.disabled !== true) {
      return (
        <Enabled style={this.props.style} value={this.props.value} usecases={this.props.usecases}/>
      );
    } else {
      return (
        <Disabled style={this.props.style} value={this.props.value} usecases={this.props.usecases}/>
      );
    }
  }
}

Score.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object,

  disabled: React.PropTypes.bool,
};

Score.defaultProps = {
  disabled: false,
};

export default Score;
