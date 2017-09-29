
import React from 'react';

import dimens from '../../../../../../framework/config/dimens';
import typefaces from '../../../../../../framework/config/typefaces';
import strings from '../../../../../../framework/config/strings';
import palette from '../../../../../../framework/config/palette';

import Container from '../../../../../atoms/container';
import TextInput from '../../../../../atoms/text-input';

const enterKey = 'Enter';
const enterCharCode = 13;

class ArticleCardAttributeComposerInput extends React.Component {
  constructor(props) {
    super(props);
    this.previouslyWasInProgress = false;

    this.value = this.value.bind(this);
    this.resetValue = this.resetValue.bind(this);
  }
  componentDidUpdate() {
    if (this.props.disableInput !== true && this.previouslyWasInProgress === true && this.props.didFail === false) {
      this.resetValue();
    }
    this.previouslyWasInProgress = this.props.disableInput;

    if (this.props.blurInput === true) {
      this.textInput.blur();
    }
  }
  value() {
    return this.textInput.value();
  }
  resetValue() {
    return this.textInput.resetValue();
  }
  render() {
    const self = this;
    return (
      <Container>
        <TextInput ref={(input) => { self.textInput = input; }}
          style={Object.assign({}, {
            marginLeft: dimens.pixels16,
            marginRight: dimens.pixels16,
            marginTop: dimens.pixels16,
            marginBottom: dimens.pixels16,
          }, this.props.style || {})} 
          textFieldStyle={{
            backgroundColor: this.props.disableInput === true ? palette.blackOlive : palette.transparent,
          }}
          inputStyle={Object.assign({}, typefaces.robotoRegular12BlackOlive, {
            color: this.props.disableInput === true ? palette.gainsboro : palette.blackOlive,
          })}
          name="attribute"
          hintText={strings.addAnAttribute}
          onKeyPress={(event) => {
            if (self.props.disableInput !== true && (event.key === enterKey || event.charCode === enterCharCode)) {
              event.preventDefault();
              self.props.actions.onAdd(self.value());
            }
          }} onFocus={self.props.actions.onUserWantsToInputAttributeName} 
          disabled={this.props.disabled}
          errorState={this.props.isValueInvalid === true}
          onChange={self.props.actions.onChange}/>
      </Container>
    );
  }
}

ArticleCardAttributeComposerInput.propTypes = {
  style: React.PropTypes.object,
  
  blurInput: React.PropTypes.bool,
  disableInput: React.PropTypes.bool,
  isValueInvalid: React.PropTypes.bool,
  didFail: React.PropTypes.bool,
  
  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  value: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types

  actions: React.PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    onAdd: React.PropTypes.func,
    onUserWantsToInputAttributeName: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }),
};

export default ArticleCardAttributeComposerInput;
