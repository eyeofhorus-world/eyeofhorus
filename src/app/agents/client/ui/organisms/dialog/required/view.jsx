
import React from 'react';

import strings from '../../../../framework/config/strings';
import dimens from '../../../../framework/config/dimens';

import Dialog from '../../../atoms/dialog';

class AttributeWarningsDialogSignInRequired extends React.Component {
  render() {
    const self = this;
    return (
      <Dialog style={Object.assign({}, {
        maxWidth: dimens.pixels320,
      }, this.props.style || {})} actions={[
        {
          label: strings.cancelCaps,
          onInteract: self.props.actions.onCancel,
        },
        {
          label: strings.signInShortCaps,
          onInteract: self.props.actions.onSignIn,
        },
      ]} isCloseable={true} onRequestClose={self.props.actions.onCancel}>
        {strings.signInRequired}
      </Dialog>
    );
  }
}

AttributeWarningsDialogSignInRequired.propTypes = {
  style: React.PropTypes.object,

  actions: React.PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    onCancel: React.PropTypes.func,
    onSignIn: React.PropTypes.func,
  }),
};

export default AttributeWarningsDialogSignInRequired;
