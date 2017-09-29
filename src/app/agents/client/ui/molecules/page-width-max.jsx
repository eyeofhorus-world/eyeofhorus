
import React from 'react';

import dimens from '../../framework/config/dimens';

import WidthConstrainedLayout from '../atoms/layouts/width-constrained';

class PageWidthMax extends React.Component {
  render() {
    return (
      <WidthConstrainedLayout maxWidth={dimens.pixels768} style={Object.assign({}, {
      }, this.props.style || {})}>
        {this.props.children}
      </WidthConstrainedLayout>
    );
  }
}

PageWidthMax.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default PageWidthMax;
