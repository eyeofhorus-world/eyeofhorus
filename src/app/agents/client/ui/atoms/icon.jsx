
import React from 'react';

import dimens from '../../framework/config/dimens';

class Icon extends React.Component {
  render() {
    return (
      <i className={`unselectable material-icons ${this.props.className}`} style={Object.assign({}, {
        display: 'inline-block',
        fontSize: dimens.pixels24,
        color: this.props.color,
        backgroundColor: this.props.backgroundColor,
      }, this.props.style || {})}>
        {this.props.value}
      </i>
    );
  }
}

Icon.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  
  value: React.PropTypes.string,
  color: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
};

export default Icon;
