
import Immutable from 'immutable';
import React from 'react';

import VerticalLayout from '../../../../atoms/layouts/vertical';

import Container from '../../../../atoms/container';
import Divider from '../../../../atoms/divider';

import Attribute from '../attribute';

import ShowMore from './show-more';

class ArticleCardAttributes extends React.Component {
  render() {
    const self = this;
    return (
      <VerticalLayout style={Object.assign({}, {
      }, this.props.style || {})}>
        <VerticalLayout>
          {this.props.attributes.map(({ key, value }) => (
            <Container key={key}>
              <Divider dashed={true}/>
              <Attribute usecases={self.props.usecases} value={value} style={{
              }}/>
            </Container>
          ))}
        </VerticalLayout>
        <ShowMore value={this.props.value} usecases={this.props.usecases}/>
      </VerticalLayout>
    );
  }
}

ArticleCardAttributes.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.instanceOf(Immutable.Map), // eslint-disable-line react/no-unused-prop-types
  attributes: React.PropTypes.instanceOf(Immutable.List),
};

export default ArticleCardAttributes;
