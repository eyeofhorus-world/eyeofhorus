
import React from 'react';

import dimens from '../../../framework/config/dimens';

import Container from '../../atoms/container';

import Input from './input';
import Button from './button';

class Search extends React.Component {
  render() {
    return (
      <Container style={Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: dimens.pixels32,
        marginLeft: dimens.pixels32,
        marginRight: dimens.pixels32,
      }, this.props.style || {})}>
        <Input style={{
        }} usecases={this.props.usecases} router={this.props.router}/>
        <Button style={{
        }} usecases={this.props.usecases} router={this.props.router}/>
      </Container>
    );
  }
}

Search.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default Search;
