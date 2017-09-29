
import React from 'react';

import dimens from '../../framework/config/dimens';
import palette from '../../framework/config/palette';
import animations from '../../framework/config/animations';
import shadows from '../../framework/config/shadows';

class Card extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.className || ''}`} style={Object.assign({}, {
        minWidth: dimens.pixels288,
        transition: `box-shadow ${animations.easeOut24ms}`,
        background: palette.babyPowder,
        borderRadius: dimens.pixels3,
        overflow: 'hidden',
        outline: 'none',
      }, this.props.style || {})}>
        <style>{`
          .card {
            box-shadow: ${shadows.elevationPixels2};
          }
          .card:hover {
            box-shadow: ${shadows.elevationPixels6};
          }
        `}</style>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default Card;
