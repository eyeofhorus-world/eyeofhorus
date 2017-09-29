
import React from 'react';

import animations from '../../framework/config/animations';
import palette from '../../framework/config/palette';

import Container from '../atoms/container';
import IconLabelInline from './icon-label-inline';

class ButtonInline extends React.Component {
  render() {
    return (
      <Container>
        <style>{`
        .button-inline {
          transition: background-color ${animations.easeOut10ms}, color ${animations.easeOut12ms};
          background-color: ${palette.transparent};
          color: ${palette.nickel};
        }
        .button-inline:hover {
          background-color: ${palette.blackOlive};
          color: ${palette.babyPowder};
        }
        .button-inline-selected {
          transition: background-color ${animations.easeOut10ms}, color ${animations.easeOut12ms};
          background-color: ${palette.nickel};
          color: ${palette.babyPowder};
        }
        .button-inline-selected:hover {
          background-color: ${palette.blackOlive};
          color: ${palette.babyPowder};
        }
      `}</style>
        <IconLabelInline className={`${this.props.selected === true ? 'button-inline-selected' : 'button-inline'}`} 
          icon={this.props.icon} label={this.props.label} selectable={false} onInteract={this.props.onInteract} 
          style={Object.assign({}, {
            cursor: 'pointer',
            backgroundColor: undefined,
            color: undefined,
          }, this.props.style || {})}
          labelStyle={this.props.labelStyle}
          labelEllipsize={this.props.labelEllipsize}/>
      </Container>
    );
  }
}

ButtonInline.propTypes = {
  style: React.PropTypes.object,
  onInteract: React.PropTypes.func,

  icon: React.PropTypes.string,
  label: React.PropTypes.string,

  selected: React.PropTypes.bool,

  labelStyle: React.PropTypes.object,
  labelEllipsize: React.PropTypes.bool,
};

ButtonInline.defaultProps = {
  selected: false,
  labelEllipsize: false,
};

export default ButtonInline;
