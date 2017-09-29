
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import palette from '../../framework/config/palette';

class Refresh extends React.Component {
  render() {
    return (
      <CircularProgress size={24}
        thickness={3.5} 
        color={palette.blackOlive}
        style={Object.assign({}, {
        }, this.props.style || {})}/>
    );
  }
}

Refresh.propTypes = {
  style: React.PropTypes.object,
};

export default Refresh;
