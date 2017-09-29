
import React from 'react';
import MediaQuery from 'react-responsive';

class Breakpoint extends React.Component {
  render() {
    const self = this;
    return (
      <MediaQuery minWidth={this.props.at.minWidth} maxWidth={this.props.at.maxWidth}>
        {matches => (matches === true ? self.props.render() : null)}
      </MediaQuery>
    );
  }
}

Breakpoint.propTypes = {
  at: React.PropTypes.shape({
    minWidth: React.PropTypes.number,
    maxWidth: React.PropTypes.number,
  }).isRequired,
  render: React.PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default Breakpoint;
