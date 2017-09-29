
import React from 'react';

import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Dialog extends React.Component {
  render() {
    const self = this;
    const actions = (this.props.actions || []).map(action => (
      <FlatButton label={action.label || ''} 
        primary={true} 
        onTouchTap={action.onInteract}
        keyboardFocused={action.focused === true}/>
    ));
    return (
      <MaterialDialog actions={actions}
        title={self.props.title}
        open={true}
        modal={this.props.isCloseable !== true}
        onRequestClose={() => {
          if (self.props.isCloseable === true) {
            const onRequestClose = this.props.onRequestClose;
            if (onRequestClose) {
              onRequestClose();
            }
          }
        }} contentStyle={Object.assign({}, {
        }, this.props.style || {})}>
        {this.props.children}
      </MaterialDialog>
    );
  }
}

Dialog.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node,

  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string,
    onInteract: React.PropTypes.func,
    focused: React.PropTypes.bool,
  })),
  title: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  isCloseable: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Dialog.defaultProps = {
  isCloseable: false,
};

export default Dialog;
