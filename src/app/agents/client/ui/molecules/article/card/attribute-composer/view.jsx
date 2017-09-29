
import React from 'react';

import dimens from '../../../../../framework/config/dimens';

import Container from '../../../../atoms/container';

import Input from './input';
import Errors from './errors';
import NetworkError from './network-error';
import Progress from './progress';

class ArticleCardAttributeComposer extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        marginLeft: dimens.pixels0,
        marginRight: dimens.pixels0,
      }, this.props.style || {})}>
        <Input value={this.props.value} usecases={this.props.usecases}/>
        <Errors value={this.props.value} usecases={this.props.usecases}/>
        <NetworkError value={this.props.value} usecases={this.props.usecases}/>
        <Progress value={this.props.value}/>
      </Container>
    );
  }
}

ArticleCardAttributeComposer.propTypes = {
  style: React.PropTypes.object,
  
  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default ArticleCardAttributeComposer;
