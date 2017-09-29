
import React from 'react';

import dimens from '../../framework/config/dimens';

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    if (this.props.preventOnClickDefault === true) {
      event.preventDefault();
    }

    const onInteract = this.props.onInteract || (() => {});
    onInteract();
  }
  render() {
    return (
      <div className={this.props.className} style={Object.assign({}, {
        borderRadius: dimens.percent50,
      }, this.props.style || {})} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

Circle.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  onInteract: React.PropTypes.func,
  children: React.PropTypes.node,

  preventOnClickDefault: React.PropTypes.bool,
};

Circle.defaultProps = {
  preventOnClickDefault: true,
};

export default Circle;
