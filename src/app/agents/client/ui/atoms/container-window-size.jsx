
import React from 'react';

import dimens from '../../framework/config/dimens';

class ContainerWindowSize extends React.Component {
  render() {
    return (
      <div className={`${this.props.className || ''}`} style={Object.assign({}, {
        minWidth: dimens.percent100,
        maxWidth: dimens.percent100,
        minHeight: dimens.viewHeight100,
        height: dimens.viewHeight100,
      }, this.props.style || {})}>
        {this.props.children}
      </div>);
  }
}

ContainerWindowSize.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

export default ContainerWindowSize;
