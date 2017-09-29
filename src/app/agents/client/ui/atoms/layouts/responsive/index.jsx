
import React from 'react';

import dimens from '../../../../framework/config/dimens';

import Breakpoint from './breakpoint';

class ResponsiveLayout extends React.Component {
  render() {
    return (
      <div className={`${this.props.className || ''}`} style={Object.assign({}, {
        width: dimens.percent100,
      }, this.props.style || {})}>
        {this.props.breakpoints.map((breakpoint, index) => (
          <Breakpoint key={`${index}`} at={breakpoint.at} render={breakpoint.render}/>
        ))}
      </div>
    );
  }
}

ResponsiveLayout.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  
  breakpoints: React.PropTypes.arrayOf(React.PropTypes.shape({
    at: Breakpoint.propTypes.at,
    render: Breakpoint.propTypes.render,
  })).isRequired,
};

export default ResponsiveLayout;
