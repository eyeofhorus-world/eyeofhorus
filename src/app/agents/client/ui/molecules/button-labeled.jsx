
import React from 'react';

import dimens from '../../framework/config/dimens';
import animations from '../../framework/config/animations';
import palette from '../../framework/config/palette';
import shadows from '../../framework/config/shadows';
import typefaces from '../../framework/config/typefaces';

import Rectangle from '../atoms/rectangle';
import Label from '../atoms/label';

class ButtonLabeled extends React.Component {
  render() {
    const shadowSmall = shadows.elevationPixels2;
    const shadowLarge = shadows.elevationPixels4;
    return (
      <Rectangle className="button-labeled-rectangle" style={Object.assign({}, {
        minWidth: dimens.pixels128,
        height: dimens.pixels36,
        maxHeight: dimens.pixels36,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: dimens.pixels2,
      }, this.props.style || {})} onInteract={this.props.onInteract}>
        <style>{`
          .button-labeled-rectangle {
            transition: box-shadow ${animations.easeOut24ms}, background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            box-shadow: ${shadowSmall};
            background-color: ${palette.transparent};
            color: ${palette.blackOlive};
          }
          .button-labeled-rectangle:hover {
            box-shadow: ${shadowLarge};
            background-color: ${palette.blackOlive};
            color: ${palette.babyPowder};
          }
        `}</style>
        <Label value={this.props.label} className="unselectable" style={Object.assign({}, typefaces.robotoRegular12BlackOlive, {
          color: undefined,
          paddingTop: dimens.pixels10,
          paddingBottom: dimens.pixels11,
        })}/>
      </Rectangle>
    );
  }
}

ButtonLabeled.propTypes = {
  style: React.PropTypes.object,

  label: React.PropTypes.string,
  onInteract: React.PropTypes.func,
};

export default ButtonLabeled;
