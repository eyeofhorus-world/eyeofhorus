
import React from 'react';

import { value as hashcode } from '../../../../../../../../utilities/hashcode';

import dimens from '../../../../../../framework/config/dimens';
import typefaces from '../../../../../../framework/config/typefaces';

import Container from '../../../../../atoms/container';
import Label from '../../../../../atoms/label';

class ArticleAttributeComposerErrors extends React.Component {
  render() {
    const messages = this.props.messages || [];
    if (messages.length > 0) {
      return (
        <Container style={Object.assign({}, {
          textAlign: 'center',
          marginTop: messages.length > 0 ? dimens.pixels11 : dimens.pixels0,
          marginBottom: messages.length > 0 ? dimens.pixels11 : dimens.pixels0,
        }, this.props.style || {})}>
          <Container style={{
            display: 'inline-block',
            textAlign: 'left',
          }}>{
            messages.map((message, index) => (
              <Label key={hashcode(message)} value={message} style={Object.assign({}, typefaces.robotoMonoLightItalic11PureRed, {
                marginLeft: dimens.pixels32,
                marginRight: dimens.pixels32,
                marginTop: index > 0 ? dimens.pixels8 : dimens.pixels0,
              })}/>
          ))}</Container>
        </Container>
      );
    } else {
      return null;
    }
  }
}

ArticleAttributeComposerErrors.propTypes = {
  style: React.PropTypes.object,
  messages: React.PropTypes.arrayOf(React.PropTypes.string),

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default ArticleAttributeComposerErrors;
