
import React from 'react';

import dimens from '../../../../../framework/config/dimens';

import CenterLayout from '../../../../atoms/layouts/center';

import Refresh from '../../../../atoms/refresh';

class ArticleGridLoading extends React.Component {
  render() {
    return (
      <CenterLayout style={Object.assign({}, {
        height: dimens.percent100,
        minHeight: dimens.pixels100,
      }, this.props.style || {})}>
        <Refresh style={{
          marginTop: dimens.pixelsneg16,
          position: undefined,
          display: undefined,
        }}/>
      </CenterLayout>
    );
  }
}

ArticleGridLoading.propTypes = {
  style: React.PropTypes.object,
};

export default ArticleGridLoading;
