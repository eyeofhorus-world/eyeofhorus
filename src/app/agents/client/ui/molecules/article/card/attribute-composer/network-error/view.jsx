
import React from 'react';

import dimens from '../../../../../../framework/config/dimens';
import typefaces from '../../../../../../framework/config/typefaces';
import palette from '../../../../../../framework/config/palette';
import strings from '../../../../../../framework/config/strings';

import Container from '../../../../../atoms/container';
import Label from '../../../../../atoms/label';

class ArticleCardAttributeComposerNetworkError extends React.Component {
  render() {
    if (this.props.showMessage === true) {
      return (
        <Container style={Object.assign({}, {
          textAlign: 'center',
          marginTop: dimens.pixels11,
          marginBottom: dimens.pixels11,
        }, this.props.style || {})}>
          <Container style={{
            display: 'inline-block',
            textAlign: 'left',
          }}>
            <Label value={strings.articleAttributeAddError} style={Object.assign({}, typefaces.robotoMonoLightItalic11PureRed, {
              marginLeft: dimens.pixels32,
              marginRight: dimens.pixels32,
              marginTop: dimens.pixels0,
              color: palette.nickel,
            })}/>
          </Container>
        </Container>
      );
    } else {
      return null;
    }
  }
}

ArticleCardAttributeComposerNetworkError.propTypes = {
  style: React.PropTypes.object,

  showMessage: React.PropTypes.bool,

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default ArticleCardAttributeComposerNetworkError;
