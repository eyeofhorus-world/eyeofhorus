
import React from 'react';

import strings from '../../../../framework/config/strings';
import dimens from '../../../../framework/config/dimens';

import Dialog from '../../../atoms/dialog';

class DialogNetwork extends React.Component {
  render() {
    const self = this;
    return (
      <Dialog style={Object.assign({}, {
        maxWidth: dimens.pixels320,
      }, this.props.style || {})} actions={[
        {
          label: strings.backCaps,
          onInteract: self.props.actions.onBack,
        },
      ]}>
        {strings.networkTrouble}
      </Dialog>
    );
  }
}

DialogNetwork.propTypes = {
  style: React.PropTypes.object,

  actions: React.PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    onCancel: React.PropTypes.func,
  }),
};

export default DialogNetwork;
