
import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import palette from '../../framework/config/palette';
import dimens from '../../framework/config/dimens';
import typefaces from '../../framework/config/typefaces';

class Dropdown extends React.Component {
  render() {
    const self = this;
    return (
      <div style={Object.assign({}, {
      }, this.props.style || {})}>
        <DropDownMenu value={this.props.value} onChange={(event, index, value) => {
          if (self.props.onChange && value !== self.props.value) {
            self.props.onChange(value);
          }
        }} style={{
          height: 'auto',
        }} 
          labelStyle={Object.assign({}, {
            lineHeight: 'auto',
            paddingLeft: dimens.pixels16,
            paddingRight: dimens.pixels24,
          }, this.props.labelStyle || {})}
          iconStyle={Object.assign({}, {
            fill: palette.blackOlive,
            padding: dimens.pixels0,
            top: dimens.pixelsneg5,
            right: dimens.pixels0,
            border: dimens.pixels0,
            width: dimens.pixels24,
            height: dimens.pixels24,
          }, this.props.iconStyle || {})}
          menuStyle={Object.assign({}, {
          }, this.props.menuStyle || {})}
          menuItemStyle={Object.assign({}, {}, this.props.menuItemStyle || {})}
          selectedMenuItemStyle={Object.assign({}, {}, this.props.selectedMenuItemStyle || {})}
          underlineStyle={{
            visibility: 'hidden',
          }}>
          {this.props.options.map(option => (
            <MenuItem key={option.id} value={option.id} primaryText={option.name}/>
          ))}
        </DropDownMenu>
      </div>
    );
  }
}

export const optionsPropDesc = React.PropTypes.arrayOf(React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
}));

Dropdown.propTypes = {
  style: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  iconStyle: React.PropTypes.object,
  menuStyle: React.PropTypes.object,
  menuItemStyle: React.PropTypes.object,
  selectedMenuItemStyle: React.PropTypes.object,

  value: React.PropTypes.string.isRequired,

  onChange: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types

  options: optionsPropDesc,
};

Dropdown.defaultProps = {
  labelStyle: typefaces.robotoLight12BlackOlive,
  menuStyle: typefaces.robotoLight12Nickel,
  menuItemStyle: typefaces.robotoLight12BlackOlive,
  selectedMenuItemStyle: typefaces.robotoLight14BlackOlive,
};

export default Dropdown;
