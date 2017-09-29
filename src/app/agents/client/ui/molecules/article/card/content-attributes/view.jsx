
import Immutable from 'immutable';
import React from 'react';

import dimens from '../../../../../framework/config/dimens';

import CenterHorizontallyLayout from '../../../../atoms/layouts/center-horizontally';

import Score from '../../../score';

class Attributes extends React.Component {
  render() {
    return (
      <CenterHorizontallyLayout style={Object.assign({}, {
        marginTop: dimens.pixels16,
        marginBottom: dimens.pixels16,
      }, this.props.style || {})}>
        <Score usecases={this.props.usecases} value={this.props.score} style={{
        }}/>
      </CenterHorizontallyLayout>
    );
  }
}

Attributes.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object,
  
  value: React.PropTypes.instanceOf(Immutable.Map), // eslint-disable-line react/no-unused-prop-types
  score: React.PropTypes.instanceOf(Immutable.Map),
};

export default Attributes;
