
import React from 'react';

import TextField from 'material-ui/TextField';

import dimens from '../../framework/config/dimens';
import typefaces from '../../framework/config/typefaces';
import palette from '../../framework/config/palette';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.default,
      isFocused: false,
    };
    this.value = this.value.bind(this);
    this.resetValue = this.resetValue.bind(this);
    this.blur = this.blur.bind(this);
  }
  blur() {
    this.textInput.blur();
  }
  value() {
    return this.textInput.props.value;
  }
  resetValue() {
    this.setState({
      value: this.props.default,
      isFocused: this.state.isFocused === true,
    });
  }
  render() {
    const self = this;

    const textFieldUnfocusedStyle = {
      height: dimens.pixels37,
      borderStyle: 'dashed',
      borderWidth: dimens.pixels1,
      borderColor: this.props.errorState === true ? palette.pureRed : palette.nickel,
      backgroundColor: palette.transparent,
    };
    const textFieldFocusedStyle = {
      height: dimens.pixels37,
      borderStyle: 'solid',
      borderWidth: dimens.pixels1,
      borderColor: this.props.errorState === true ? palette.pureRed : palette.blackOlive,
      backgroundColor: palette.transparent,
    };
    const textFieldStyle = this.state.isFocused === true || (this.state.value && this.state.value.length > 0) ?
      textFieldFocusedStyle : textFieldUnfocusedStyle;

    return (
      <div style={Object.assign({}, {
      }, this.props.style || {})}>
        <TextField 
          ref={(input) => { self.textInput = input; }}
          name={this.props.name} 
          hintText={this.props.hintText} 
          value={this.state.value || ''} 
          fullWidth={true}
          underlineShow={false} 
          style={Object.assign({}, textFieldStyle, this.props.textFieldStyle || {})}
          inputStyle={Object.assign({}, {
            padding: dimens.pixels8,
            font: 'none',
          }, this.props.inputStyle || {})}
          hintStyle={Object.assign({}, {
            paddingLeft: dimens.pixels8,
            paddingRight: dimens.pixels8,
            paddingTop: dimens.pixels6,
            bottom: 'auto',
          }, this.props.hintStyle || {})}
          onChange={(event) => {
            const value = event.target.value;
            self.setState({
              value,
              isFocused: self.state.isFocused,
            });
            if (self.props.onChange) {
              self.props.onChange(value);
            }
          }} onFocus={() => {
            self.setState({
              value: self.state.value,
              isFocused: true,
            });
            if (self.props.onFocus) {
              self.props.onFocus();
            }
          }} onBlur={() => {
            self.setState({
              value: self.state.value,
              isFocused: false,
            });
            if (self.props.onBlur) {
              self.props.onBlur();
            }
          }} onKeyPress={(event) => {
            if (self.props.onKeyPress) {
              self.props.onKeyPress(event);
            } 
          }} disabled={this.props.disabled}/>
      </div>
    );
  }
}

TextInput.propTypes = {
  style: React.PropTypes.object,

  default: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  hintText: React.PropTypes.string,
  textFieldStyle: React.PropTypes.object,
  inputStyle: React.PropTypes.object,
  hintStyle: React.PropTypes.object,
  onChange: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onKeyPress: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onFocus: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onBlur: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  errorState: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

TextInput.defaultProps = {
  inputStyle: typefaces.robotoRegular12BlackOlive,
  hintStyle: typefaces.robotoItalic12Nickel,
  default: '',
  errorState: false,
  disabled: false,
};

export default TextInput;
