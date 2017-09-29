
import React from 'react';

import fontIcons from '../../../../../../framework/config/font-icons';
import dimens from '../../../../../../framework/config/dimens';

import VerticalLayout from '../../../../../atoms/layouts/vertical';

import Container from '../../../../../atoms/container';
import Divider from '../../../../../atoms/divider';
import Refresh from '../../../../../atoms/refresh';

import CardButton from '../../../../card/button';

class ArticleCardAttributesShowMore extends React.Component {
  render() {
    if (this.props.inProgress) {
      return (
        <VerticalLayout>
          <Divider dashed={true}/>
          <Container style={{
            height: dimens.pixels42,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Refresh/>
          </Container>
        </VerticalLayout>
      );
    } else if (this.props.showMore === true) {
      return (
        <VerticalLayout>
          <Divider dashed={true}/>
          <CardButton icon={fontIcons.keyboardArrowDown} roundBottomCorners={true} onInteract={this.props.actions.onShowMore}/>
        </VerticalLayout>
      );
    } else {
      return null;
    }
  }
}

ArticleCardAttributesShowMore.propTypes = {
  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  inProgress: React.PropTypes.bool,
  showMore: React.PropTypes.bool,
};

export default ArticleCardAttributesShowMore;
