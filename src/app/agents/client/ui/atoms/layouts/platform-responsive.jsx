
import React from 'react';

import dimens from '../../../framework/config/dimens';

import Responsive from './responsive';

class PlatformResponsiveLayout extends React.Component {
  render() {
    return (
      <Responsive className={`${this.props.className || ''}`} style={Object.assign({}, {
      }, this.props.style || {})} breakpoints={[
        {
          at: {
            maxWidth: dimens.pixels767i,
          },
          render: this.props.mobile,
        },
        {
          at: {
            minWidth: dimens.pixels768i,
          },
          render: this.props.tabletAndAbove,
        },
      ]}/>
    );
  }
}

PlatformResponsiveLayout.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,

  mobile: React.PropTypes.func,
  tabletAndAbove: React.PropTypes.func,
};

export default PlatformResponsiveLayout;
