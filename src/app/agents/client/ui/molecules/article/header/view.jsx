
import React from 'react';

import strings from '../../../../framework/config/strings';
import typefaces from '../../../../framework/config/typefaces';
import dimens from '../../../../framework/config/dimens';

import Container from '../../../atoms/container';
import Label from '../../../atoms/label';

class ArticleHeader extends React.Component {
  render() {
    if (this.props.showingMostRecent === true) {
      return (        
        <Container style={Object.assign({}, {
          textAlign: 'center',
        }, this.props.style || {})}>
          <Label value={strings.mostRecent} 
            style={Object.assign({}, typefaces.robotoBold18BlackOlive, {
              marginTop: this.props.showingSearchButton === true ? dimens.pixels32 : dimens.pixels84,
              marginLeft: dimens.pixels16,
              marginRight: dimens.pixels16,
            })}/>
        </Container>
      );
    } else {
      return null;
    }
  }
}

ArticleHeader.propTypes = {
  style: React.PropTypes.object,

  showingMostRecent: React.PropTypes.bool,
  showingSearchButton: React.PropTypes.bool,
};

export default ArticleHeader;
