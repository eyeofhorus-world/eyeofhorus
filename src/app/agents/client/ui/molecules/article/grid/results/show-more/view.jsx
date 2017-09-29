
import React from 'react';

import Button from './button';
import Working from './working';

class ArticleGridResultsShowMore extends React.Component {
  render() {
    if (this.props.inProgress === true) {
      return (
        <Working/>
      );
    } else if (this.props.isThereMoreToShow === true) {
      return (
        <Button onInteract={this.props.actions.onShowMore} didFail={this.props.didFail}/>
      );
    } else {
      return null;
    }
  }
}

ArticleGridResultsShowMore.propTypes = {
  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  inProgress: React.PropTypes.bool,
  didFail: React.PropTypes.bool,
  isThereMoreToShow: React.PropTypes.bool,

  actions: React.PropTypes.shape({
    onShowMore: React.PropTypes.func,
  }),
};

export default ArticleGridResultsShowMore;
