
import React from 'react';

import strings from '../../../../framework/config/strings';
import dimens from '../../../../framework/config/dimens';

import Container from '../../../atoms/container';

import ButtonLabeled from '../../button-labeled';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.previouslyFailed = false;
  }
  render() {
    if (this.props.showSearchButton === true) {
      let animationClasses = '';
      if (this.previouslyFailed !== true && this.props.canRetry === true) {
        animationClasses = ' animated shake ';
      }
      this.previouslyFailed = this.props.canRetry === true;
      
      return (
        <Container className={`${animationClasses}`} style={Object.assign({}, {
          marginTop: dimens.pixels16,
          display: 'flex',
          justifyContent: 'center',
        }, this.props.style || {})}>
          <ButtonLabeled label={this.props.canRetry === true ? strings.retry : strings.search} 
            onInteract={this.props.actions.onSearch}/>
        </Container>
      );
    } else {
      this.previouslyFailed = false;
      return null;
    }
  }
}

SearchButton.propTypes = {
  style: React.PropTypes.object,

  showSearchButton: React.PropTypes.bool,
  canRetry: React.PropTypes.bool,

  actions: React.PropTypes.shape({
    onSearch: React.PropTypes.func,
  }),

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default SearchButton;
