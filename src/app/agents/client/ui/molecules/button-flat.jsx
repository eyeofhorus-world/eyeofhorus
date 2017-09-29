
import React from 'react';

import dimens from '../../framework/config/dimens';
import animations from '../../framework/config/animations';
import palette from '../../framework/config/palette';
import typefaces from '../../framework/config/typefaces';

import Rectangle from '../atoms/rectangle';
import Label from '../atoms/label';

class ButtonFlat extends React.Component {
  render() {
    const self = this;
    return (
      <Rectangle className={`button-flat-rectangle${this.props.disabled === true ? '-disabled' : ''}`} style={Object.assign({}, {
        cursor: this.props.disabled === true ? 'default' : 'pointer',
        borderRadius: dimens.pixels2,
        height: dimens.pixels42,
        minWidth: dimens.pixels68,
        textAlign: 'center',
      }, this.props.style || {})} onInteract={() => {
        if (self.props.onInteract && self.props.disabled !== true) {
          self.props.onInteract();
        }
      }}>
        <style>{`
          .button-flat-rectangle {
            transition: background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            background-color: ${palette.transparent};
            color: ${palette.blackOlive};
          }
          .button-flat-rectangle:hover {
            background-color: ${palette.nickel};
            color: ${palette.babyPowder};
          }
          .button-flat-rectangle-disabled {
            transition: background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            background-color: ${palette.transparent};
            color: ${palette.silver};
          }
        `}</style>
        <Label value={this.props.label} className="unselectable" style={Object.assign({}, typefaces.robotoMonoRegular12, {
          color: undefined,
          paddingTop: dimens.pixels13,
        })}/>
      </Rectangle>
    );
  }
}

ButtonFlat.propTypes = {
  style: React.PropTypes.object,

  label: React.PropTypes.string,
  onInteract: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  disabled: React.PropTypes.bool,
};

export default ButtonFlat;
