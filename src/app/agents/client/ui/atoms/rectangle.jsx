
import React from 'react';

class Rectangle extends React.Component {
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
      <div className={`${this.props.className || ''}`} style={Object.assign({}, {
        backgroundColor: this.props.color,
      }, this.props.style || {})} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

Rectangle.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  onInteract: React.PropTypes.func,
  children: React.PropTypes.node,

  color: React.PropTypes.string,

  preventOnClickDefault: React.PropTypes.bool,
};

Rectangle.defaultProps = {
  preventOnClickDefault: true,
};

export default Rectangle;
