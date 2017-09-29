
import React from 'react';

import dimens from '../../framework/config/dimens';
import palette from '../../framework/config/palette';
import animations from '../../framework/config/animations';
import shadows from '../../framework/config/shadows';

import Circle from '../atoms/circle';
import Rectangle from '../atoms/rectangle';
import Icon from '../atoms/icon';

class ButtonSmall extends React.Component {
  render() {
    if (this.props.raised === true) {
      return (
        <Circle className={`button-small-circle-raised${this.props.elevated === true ? '-elevated' : ''}`} style={Object.assign({}, {
          width: dimens.pixels60,
          height: dimens.pixels60,
          minWidth: dimens.pixels60,
          minHeight: dimens.pixels60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }, this.props.style || {})} onInteract={this.props.onInteract}>
          <style>{`
            .button-small-circle-raised {
              transition: background-color ${animations.easeOut28ms}, color ${animations.easeOut30ms};
              background-color: ${palette.transparent};
              color: ${palette.blackOlive};
            }
            .button-small-circle-raised:hover {
              background-color: ${palette.blackOlive};
              color: ${palette.babyPowder};
            }
            .button-small-circle-raised-elevated {
              transition: box-shadow ${animations.easeOut30ms}, background-color ${animations.easeOut28ms}, color ${animations.easeOut30ms};
              box-shadow: ${shadows.elevationPixels4};
              background-color: ${palette.transparent};
              color: ${palette.blackOlive};
            }
            .button-small-circle-raised-elevated:hover {
              box-shadow: ${shadows.elevationPixels8};
              background-color: ${palette.blackOlive};
              color: ${palette.babyPowder};
            }
          `}</style>
          <Icon value={this.props.icon}/>
        </Circle>
      );
    } else {
      return (
        <Rectangle className="button-small-circle" style={Object.assign({}, {
          width: dimens.pixels60,
          height: dimens.pixels60,
          minWidth: dimens.pixels60,
          minHeight: dimens.pixels60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }, this.props.style || {})} onInteract={this.props.onInteract}>
          <style>{`
            .button-small-circle {
              transition: background-color ${animations.easeOut28ms}, color ${animations.easeOut30ms};
              background-color: ${palette.transparent};
              color: ${palette.nickel};
            }
            .button-small-circle:hover {
              background-color: ${palette.transparent};
              color: ${palette.blackOlive};
            }
          `}</style>
          <Icon value={this.props.icon}/>
        </Rectangle>);
    }
  }
}

ButtonSmall.propTypes = {
  style: React.PropTypes.object,
  
  raised: React.PropTypes.bool,
  elevated: React.PropTypes.bool,
  icon: React.PropTypes.string,

  onInteract: React.PropTypes.func,
};

ButtonSmall.defaultProps = {
  raised: false,
  elevated: false,
};

export default ButtonSmall;
