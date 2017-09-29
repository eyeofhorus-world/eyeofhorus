
import Immutable from 'immutable';
import React from 'react';

import typefaces from '../../../../../framework/config/typefaces';
import dimens from '../../../../../framework/config/dimens';
import palette from '../../../../../framework/config/palette';

import VerticalLayout from '../../../../atoms/layouts/vertical';
import CenterHorizontallyLayout from '../../../../atoms/layouts/center-horizontally';

import Label from '../../../../atoms/label';

import Score from '../../../score';

class ArticleCardAttribute extends React.Component {
  render() {
    return (
      <VerticalLayout style={Object.assign({}, {
        minHeight: dimens.pixels56,
      }, this.props.style || {})}>
        <CenterHorizontallyLayout style={{
          marginTop: dimens.pixels22,
          marginLeft: dimens.pixels36,
          marginRight: dimens.pixels36,
          marginBottom: dimens.pixels11,
        }}>
          <Label value={`${this.props.name}`} 
            style={Object.assign({}, typefaces.robotoRegular12, {
              wordWrap: 'break-word',
              maxWidth: dimens.percent100,
              color: palette.blackOlive,
            })}/>
        </CenterHorizontallyLayout>

        <CenterHorizontallyLayout style={Object.assign({}, {
          marginBottom: dimens.pixels16,
        }, this.props.style || {})}>
          <Score usecases={this.props.usecases} value={this.props.score} style={{
          }}/>
        </CenterHorizontallyLayout>
      </VerticalLayout>
    );
  }
}

ArticleCardAttribute.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object,
  value: React.PropTypes.instanceOf(Immutable.Map), // eslint-disable-line react/no-unused-prop-types

  name: React.PropTypes.string,
  score: React.PropTypes.instanceOf(Immutable.Map),
};

export default ArticleCardAttribute;
