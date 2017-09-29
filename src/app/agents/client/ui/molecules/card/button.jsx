
import React from 'react';

import dimens from '../../../framework/config/dimens';
import animations from '../../../framework/config/animations';
import palette from '../../../framework/config/palette';

import Rectangle from '../../atoms/rectangle';
import Icon from '../../atoms/icon';

class CardButton extends React.Component {
  render() {
    return (
      <Rectangle className="card-button-inline" style={Object.assign({}, {
        cursor: 'pointer',
        borderBottomLeftRadius: this.props.roundBottomCorners === true ? dimens.pixels3 : dimens.pixels0,
        borderBottomRightRadius: this.props.roundBottomCorners === true ? dimens.pixels3 : dimens.pixels0,
        textAlign: 'center',
      }, this.props.style || {})} onInteract={this.props.onInteract}>
        <style>{`
          .card-button-inline {
            transition: background-color ${animations.easeOut22ms}, color ${animations.easeOut24ms};
            background-color: ${palette.transparent};
            color: ${palette.nickel};
          }
          .card-button-inline:hover {
            background-color: ${palette.blackOlive};
            color: ${palette.babyPowder};
          }
        `}</style>
        <Icon className="unselectable" value={this.props.icon} style={{
          fontSize: dimens.pixels18,
          paddingTop: dimens.pixels12,
          paddingBottom: dimens.pixels12,
          backgroundColor: undefined,
          color: undefined,
        }}/>
      </Rectangle>
    );
  }
}

CardButton.propTypes = {
  style: React.PropTypes.object,
  icon: React.PropTypes.string,
  onInteract: React.PropTypes.func,
  roundBottomCorners: React.PropTypes.bool,
};

CardButton.defaultProps = {
  roundBottomCorners: false,
};

export default CardButton;
