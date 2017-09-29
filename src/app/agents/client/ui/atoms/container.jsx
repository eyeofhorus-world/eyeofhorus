
import React from 'react';

class Container extends React.Component {
  render() {
    return (
      <div className={`${this.props.className || ''}`} style={Object.assign({}, {
      }, this.props.style || {})}>
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default Container;
