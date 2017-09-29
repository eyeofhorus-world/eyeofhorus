
import React from 'react';

import Loading from './loading';
import Results from './results';

class ArticleGrid extends React.Component {
  render() {
    if (this.props.isLoading === true) {
      return (
        <Loading style={this.props.style}/>
      );
    } else {
      return (
        <Results style={this.props.style} usecases={this.props.usecases}/>
      );
    }
  }
}

ArticleGrid.propTypes = {
  style: React.PropTypes.object,

  usecases: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
};

export default ArticleGrid;
