
import React from 'react';

import HeaderContentFooterTemplate from '../../templates/header-content-footer';

import Toolbar from '../../organisms/toolbar';
import Articles from '../../organisms/articles';
import Dialog from '../../organisms/dialog';
import Footer from '../../organisms/footer';

class HomePage extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props.route.onPagePropsChanged(nextProps);
  }
  render() {
    return (
      <HeaderContentFooterTemplate header={() => (
        <Toolbar/>
      )} content={style => (
        <Articles style={style} usecases={this.props.route.usecases} router={this.props.router}/>
      )} dialog={() => (
        <Dialog/>
      )} footer={style => (
        <Footer style={style}/>
      )}/>
    );
  }
}

HomePage.propTypes = {
  location: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  route: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default HomePage;
