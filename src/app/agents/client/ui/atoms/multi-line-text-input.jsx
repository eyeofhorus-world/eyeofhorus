 
import React from 'react';

import TextField from 'material-ui/TextField';

import dimens from '../../framework/config/dimens';
import typefaces from '../../framework/config/typefaces';
import palette from '../../framework/config/palette';

class MultiLineTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.default,
      isFocused: false,
    };
    this.value = this.value.bind(this);
  }
  value() {
    return this.textInput.props.value;
  }
  render() {
    const self = this;
    const textFieldUnfocusedStyle = {
      borderStyle: 'dashed',
      borderWidth: dimens.pixels1,
      borderColor: this.props.errorState === true ? palette.pureRed : palette.nickel,
      backgroundColor: palette.transparent,
    };
    const textFieldFocusedStyle = {
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
          multiLine={true} 
          rows={4} 
          rowsMax={4}
          style={textFieldStyle}
          inputStyle={Object.assign({}, {
            padding: dimens.pixels8,
            marginTop: dimens.pixelsneg12,
            font: 'none',
          }, this.props.inputStyle || {})} 
          hintStyle={Object.assign({}, {
            top: dimens.pixels8,
            left: dimens.pixels8,
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
          }} onBlur={() => {
            self.setState({
              value: self.state.value,
              isFocused: false,
            });
          }}/>
      </div>
    );
  }
}

MultiLineTextInput.propTypes = {
  style: React.PropTypes.object,

  default: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  hintText: React.PropTypes.string,
  inputStyle: React.PropTypes.object,
  hintStyle: React.PropTypes.object,
  onChange: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  errorState: React.PropTypes.bool,
};

MultiLineTextInput.defaultProps = {
  inputStyle: typefaces.robotoRegular12BlackOlive,
  hintStyle: typefaces.robotoItalic12Nickel,
  default: '',
  errorState: false,
};

export default MultiLineTextInput;
