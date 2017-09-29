
import React from 'react';

import palette from '../../../../framework/config/palette';
import dimens from '../../../../framework/config/dimens';
import fontIcons from '../../../../framework/config/font-icons';

import Rectangle from '../../../atoms/rectangle';

import IconLabelInline from '../../../molecules/icon-label-inline';

import helpers from '../helpers';

class ScoreDisabled extends React.Component {
  render() {
    return (
      <Rectangle style={Object.assign({}, {
        backgroundColor: palette.nickel,
        color: palette.babyPowder,
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
        <IconLabelInline icon={fontIcons.thumbUp} 
          label={helpers.voteNumberFormat(this.props.upVoteCount)}
          selectable={false} 
          style={{
            cursor: 'default',
            backgroundColor: undefined,
            color: undefined,
            marginLeft: dimens.pixels16,
          }} labelStyle={{
            minWidth: dimens.pixels24,
            maxWidth: dimens.pixels60,
            textAlign: 'center',
          }} labelEllipsize={true}/>
        <IconLabelInline icon={fontIcons.thumbDown}
          label={helpers.voteNumberFormat(this.props.downVoteCount)}
          selectable={false}
          style={{
            cursor: 'default',
            backgroundColor: undefined,
            color: undefined,
            marginLeft: dimens.pixels8,
          }} labelStyle={{
            minWidth: dimens.pixels24,
            maxWidth: dimens.pixels60,
            textAlign: 'left',
          }} labelEllipsize={true}/>
      </Rectangle>
    );
  }
}

ScoreDisabled.propTypes = {
  style: React.PropTypes.object,

  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  fulfillmentType: React.PropTypes.number,
  descriptionType: React.PropTypes.number,
  upVoteCount: React.PropTypes.number.isRequired,
  downVoteCount: React.PropTypes.number.isRequired,
};

export default ScoreDisabled;
