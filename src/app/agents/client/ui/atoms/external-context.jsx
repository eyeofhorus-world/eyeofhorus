
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import materialTheme from '../../framework/config/material-theme';

class ExternalContext extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={materialTheme}>
        <div style={Object.assign({}, {
        }, this.props.style || {})}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

ExternalContext.propTypes = {
  style: React.PropTypes.object,
};

export default ExternalContext;
