
import React from 'react';

import palette from '../../../../framework/config/palette';
import dimens from '../../../../framework/config/dimens';
import fontIcons from '../../../../framework/config/font-icons';

import Rectangle from '../../../atoms/rectangle';

import IconLabelInline from '../../../molecules/icon-label-inline';
import ButtonInline from '../../../molecules/button-inline';

import helpers from '../helpers';

class ScoreEnabled extends React.Component {
  render() {
    return (
      <Rectangle style={Object.assign({}, {
        backgroundColor: palette.transparent,
        color: palette.nickel,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
      }, this.props.style || {})}>
        <IconLabelInline icon={helpers.fulfillmentIcon(this.props.fulfillmentType)} 
          label={helpers.descriptionText(this.props.descriptionType)}
          selectable={false}
          style={{
            cursor: 'default',
            backgroundColor: undefined,
            color: undefined,
            marginLeft: dimens.pixels8,
          }}/>
        <ButtonInline icon={fontIcons.thumbUp} 
          label={helpers.voteNumberFormat(this.props.upVoteCount)} 
          selected={this.props.upVoted === true}
          onInteract={this.props.actions.onUpVoteInteracted}
          labelStyle={{
            minWidth: dimens.pixels24,
            maxWidth: dimens.pixels60,
            textAlign: 'left',
          }} labelEllipsize={true} style={{
            marginLeft: dimens.pixels16,
          }}/>
        <ButtonInline icon={fontIcons.thumbDown} 
          label={helpers.voteNumberFormat(this.props.downVoteCount)}
          selected={this.props.downVoted === true}
          onInteract={this.props.actions.onDownVoteInteracted}
          labelStyle={{
            minWidth: dimens.pixels24,
            maxWidth: dimens.pixels60,
            textAlign: 'left',
          }} labelEllipsize={true} style={{
            marginLeft: dimens.pixels8,
          }}/>
      </Rectangle>
    );
  }
}

ScoreEnabled.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  fulfillmentType: React.PropTypes.number,
  descriptionType: React.PropTypes.number,
  upVoteCount: React.PropTypes.number.isRequired,
  downVoteCount: React.PropTypes.number.isRequired,
  upVoted: React.PropTypes.bool,
  downVoted: React.PropTypes.bool,
  
  actions: React.PropTypes.shape({
    onUpVoteInteracted: React.PropTypes.func,
    onDownVoteInteracted: React.PropTypes.func,
  }),
};

export default ScoreEnabled;
