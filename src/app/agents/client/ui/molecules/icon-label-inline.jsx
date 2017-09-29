
import React from 'react';

import dimens from '../../framework/config/dimens';
import palette from '../../framework/config/palette';
import typefaces from '../../framework/config/typefaces';

import Icon from '../atoms/icon';
import Label from '../atoms/label';
import Rectangle from '../atoms/rectangle';

class IconLabelInline extends React.Component {
  render() {
    if (this.props.label) {
      return (
        <Rectangle className={`${this.props.className || ''}`} style={Object.assign({}, typefaces.robotoRegular11, {
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          paddingLeft: dimens.pixels4,
          paddingRight: dimens.pixels5,
          paddingTop: dimens.pixels3,
          paddingBottom: dimens.pixels3,
          backgroundColor: this.props.backgroundColor,
          color: this.props.color,
        }, this.props.style || {})} onInteract={this.props.onInteract}>
          <Icon value={this.props.icon} style={{
            fontSize: dimens.pixels18,
          }}/>
          <Label className={`${this.props.selectable !== true ? 'unselectable' : ''}`} value={this.props.label} style={Object.assign({}, {
            marginLeft: this.props.label.length > 0 ? dimens.pixels8 : dimens.pixels0,
          }, this.props.labelStyle || {})} ellipsize={this.props.labelEllipsize}/>
        </Rectangle>
      );
    } else {
      return (
        <Rectangle className={`${this.props.className || ''}`} style={Object.assign({}, typefaces.robotoRegular11, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: dimens.pixels24,
          height: dimens.pixels24,
          backgroundColor: this.props.backgroundColor,
          color: this.props.color,
        }, this.props.style || {})} onInteract={this.props.onInteract}>
          <Icon value={this.props.icon} style={{
            fontSize: dimens.pixels18,
          }}/>
        </Rectangle>
      );
    }
  }
}

IconLabelInline.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  onInteract: React.PropTypes.func,

  icon: React.PropTypes.string,
  label: React.PropTypes.string,

  labelStyle: React.PropTypes.object,
  labelEllipsize: React.PropTypes.bool,

  backgroundColor: React.PropTypes.string,
  color: React.PropTypes.string,

  selectable: React.PropTypes.bool,
};

IconLabelInline.defaultProps = {
  backgroundColor: palette.transparent,
  color: palette.nickel,
  selectable: true,
  labelEllipsize: false,
};

export default IconLabelInline;
