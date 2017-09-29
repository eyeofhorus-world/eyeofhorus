
import React from 'react';

import dimens from '../../../framework/config/dimens';

import Rectangle from '../../atoms/rectangle';

import ButtonFlat from '../button-flat';

class CardActions extends React.Component {
  render() {
    return (
      <Rectangle style={Object.assign({}, {
        textAlign: 'left',
      }, this.props.style || {})}>
        <ButtonFlat style={{
          marginLeft: dimens.pixels16,
          display: 'inline-block',
        }} label={this.props.negativeLabel} 
          onInteract={this.props.onNegativeInteract}
          disabled={this.props.negativeDisabled}/>
        <ButtonFlat style={{
          display: 'inline-block',
        }} label={this.props.positiveLabel} 
          onInteract={this.props.onPositiveInteract}
          disabled={this.props.positiveDisabled}/>
      </Rectangle>
    );
  }
}

CardActions.propTypes = {
  style: React.PropTypes.object,

  negativeLabel: React.PropTypes.string,
  positiveLabel: React.PropTypes.string,

  onNegativeInteract: React.PropTypes.func,
  onPositiveInteract: React.PropTypes.func,

  negativeDisabled: React.PropTypes.bool,
  positiveDisabled: React.PropTypes.bool,
};

CardActions.defaultProps = {
  negativeDisabled: false,
  positiveDisabled: false,
};

export default CardActions;
