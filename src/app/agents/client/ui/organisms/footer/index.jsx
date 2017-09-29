
import React from 'react';

import dimens from '../../../framework/config/dimens';

import VerticalLayout from '../../atoms/layouts/vertical';
import CenterHorizontallyLayout from '../../atoms/layouts/center-horizontally';

import Copyright from '../../molecules/copyright';
import Donate from '../../molecules/donate';

class Footer extends React.Component {
  render() {
    return (
      <VerticalLayout style={Object.assign({}, {
      }, this.props.style || {})}>
        <Donate/>
        <CenterHorizontallyLayout style={{
          marginTop: dimens.pixels22,
          marginBottom: dimens.pixels16,
        }}>
          <Copyright/>
        </CenterHorizontallyLayout>
      </VerticalLayout>
    );
  }
}

Footer.propTypes = {
  style: React.PropTypes.object,
};

export default Footer;
