
import Immutable from 'immutable';
import React from 'react';

import strings from '../../../../../framework/config/strings';
import typefaces from '../../../../../framework/config/typefaces';
import dimens from '../../../../../framework/config/dimens';

import Container from '../../../../atoms/container';
import Label from '../../../../atoms/label';

class ArticleCardContent extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        textAlign: 'center',
      }, this.props.style || {})}>
        <Label value={`${strings.openQuote}${this.props.quote}${strings.closeQuote}`} 
          style={Object.assign({}, typefaces.kuraleRegular18BlackOlive, {
            marginTop: dimens.pixels22,
            marginLeft: dimens.pixels16,
            marginRight: dimens.pixels16,
            wordWrap: 'break-word',
          })}/>
      </Container>
    );
  }
}

ArticleCardContent.propTypes = {
  style: React.PropTypes.object,

  value: React.PropTypes.instanceOf(Immutable.Map), // eslint-disable-line react/no-unused-prop-types

  quote: React.PropTypes.string,
};

export default ArticleCardContent;
