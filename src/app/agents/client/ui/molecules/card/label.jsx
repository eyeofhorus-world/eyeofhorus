
import React from 'react';

import typefaces from '../../../framework/config/typefaces';
import dimens from '../../../framework/config/dimens';

import Rectangle from '../../atoms/rectangle';
import Label from '../../atoms/label';
import Divider from '../../atoms/divider';

class CardLabel extends React.Component {
  render() {
    return (
      <Rectangle style={Object.assign({}, typefaces.robotoMonoLightItalic11Nickel, {
        height: dimens.pixels42,
        textAlign: 'center',
      }, this.props.style || {})}>
        <Label value={this.props.value || ''} style={{
          paddingTop: dimens.pixels14,
        }}/>
        <Divider dashed={true} style={{
          display: 'inline-block',
        }}/>
      </Rectangle>
    );
  }
}

CardLabel.propTypes = {
  style: React.PropTypes.object,
  value: React.PropTypes.string.isRequired,
};

export default CardLabel;
