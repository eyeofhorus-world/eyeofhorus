
import React from 'react';

import dimens from '../../../framework/config/dimens';

import Container from '../../atoms/container';

import ArticleHeader from '../../molecules/article/header';
import ArticleGrid from '../../molecules/article/grid';
import Search from '../../molecules/search';

class Articles extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        flexDirection: 'column',
      }, this.props.style || {})}>
        <Search usecases={this.props.usecases} router={this.props.router}/>
        <ArticleHeader/>
        <Container style={{
          flexGrow: 1,
          marginBottom: dimens.pixels16,
        }}>
          <ArticleGrid usecases={this.props.usecases}/>
        </Container>
      </Container>
    );
  }
}

Articles.propTypes = {
  style: React.PropTypes.object,
  
  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default Articles;
