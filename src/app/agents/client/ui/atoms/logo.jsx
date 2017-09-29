
import React from 'react';
import { Link } from 'react-router';

import dimens from '../../framework/config/dimens';
import resources from '../../framework/config/resources';
import links from '../../framework/config/links';

export const logoHeight = dimens.pixels60;

class Logo extends React.Component {
  render() {
    return (
      <Link style={Object.assign({}, {
        width: dimens.pixels83,
        height: dimens.pixels60,
        backgroundImage: `url('${resources.images.logo}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        cursor: 'pointer',
        outline: 'none',
      }, this.props.style || {})} to={links.home}/>
    );
  }
}

Logo.propTypes = {
  style: React.PropTypes.object,
};

export default Logo;
