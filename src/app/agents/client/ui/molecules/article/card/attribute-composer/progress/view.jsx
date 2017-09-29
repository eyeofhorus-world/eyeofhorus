
import React from 'react';

import dimens from '../../../../../../framework/config/dimens';

import Container from '../../../../../atoms/container';
import Divider from '../../../../../atoms/divider';
import Refresh from '../../../../../atoms/refresh';

class ArticleAttributeComposerProgress extends React.Component {
  render() {
    if (this.props.displayInProgress) {
      return (
        <Container style={{
        }}>
          <Divider dashed={true}/>
          <Refresh style={{
            marginTop: dimens.pixels32,
            marginBottom: dimens.pixels32,
            display: 'flex',
            justifyContent: 'center',
            width: undefined,
          }}/>
        </Container>
      );
    } else {
      return null;
    }
  }
}

ArticleAttributeComposerProgress.propTypes = {
  displayInProgress: React.PropTypes.bool,

  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default ArticleAttributeComposerProgress;
