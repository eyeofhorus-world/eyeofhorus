
import React from 'react';

import dimens from '../../../framework/config/dimens';

class WidthConstrainedLayout extends React.Component {
  render() {
    return (
      <div style={Object.assign({}, {
        width: dimens.percent100,
        maxWidth: this.props.maxWidth,
      }, this.props.style || {})}>
        {this.props.children}
      </div>
    );
  }
}

WidthConstrainedLayout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,

  maxWidth: React.PropTypes.string.isRequired,
};

export default WidthConstrainedLayout;
