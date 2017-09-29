
import React from 'react';

import dimens from '../../framework/config/dimens';

class Label extends React.Component {
  render() {
    let style = {};
    if (this.props.ellipsize === true) {
      style = Object.assign({}, style, {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      });
    }
    return (
      <p className={`${this.props.className || ''}`} style={Object.assign({}, style, {
        margin: dimens.pixels0,
      }, this.props.style || {})}>
        {this.props.value}
      </p>
    );
  }
}

Label.propTypes = {
  style: React.PropTypes.object,
  value: React.PropTypes.string,
  ellipsize: React.PropTypes.bool,
};

Label.defaultProps = {
  ellipsize: false,
};

export default Label;
