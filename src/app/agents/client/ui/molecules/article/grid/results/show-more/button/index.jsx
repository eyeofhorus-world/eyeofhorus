
import React from 'react';

import dimens from '../../../../../../../framework/config/dimens';
import strings from '../../../../../../../framework/config/strings';

import Container from '../../../../../../atoms/container';

import ButtonLabeled from '../../../../../button-labeled';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.previouslyFailed = false;
  }
  render() {
    let animationClasses = '';
    if (this.previouslyFailed !== true && this.props.didFail === true) {
      animationClasses = ' animated shake ';
    }
    this.previouslyFailed = this.props.didFail === true;
    return (
      <Container className={`${animationClasses}`} style={{
        marginTop: dimens.pixels16,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <ButtonLabeled label={this.props.didFail === true ? strings.retry : strings.showMore}
          onInteract={this.props.onInteract}/>
      </Container>
    );
  }
}

Button.propTypes = {
  didFail: React.PropTypes.bool,
  onInteract: React.PropTypes.func,
};

export default Button;
