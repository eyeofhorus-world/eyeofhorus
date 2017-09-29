
import React from 'react';

import dimens from '../../../../framework/config/dimens';
import strings from '../../../../framework/config/strings';
import palette from '../../../../framework/config/palette';
import typefaces from '../../../../framework/config/typefaces';

import TextInput from '../../../atoms/text-input';

const enterKey = 'Enter';
const enterCharCode = 13;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.lastQuery = null;
    this.value = this.value.bind(this);
  }
  componentDidUpdate() {
    if (this.lastQuery !== this.props.lastQuery) {
      this.textInput.resetValue();
    }
    this.lastQuery = this.props.lastQuery;
  }
  value() {
    return this.textInput.value();
  }
  render() {
    const self = this;
    return (
      <TextInput ref={(input) => { self.textInput = input; }}
        style={Object.assign({}, {
          maxWidth: dimens.pixels485,
          width: dimens.percent100,
        }, this.props.style || {})} 
        textFieldStyle={{
          backgroundColor: this.props.disabled === true ? palette.blackOlive : palette.transparent,
        }}
        inputStyle={Object.assign({}, typefaces.robotoRegular12BlackOlive, {
          color: this.props.disabled === true ? palette.gainsboro : palette.blackOlive,
        })}
        name="search"
        default={this.props.lastQuery}
        hintText={strings.enterYourQuery}
        onChange={(value) => {
          if (self.props.disabled !== true && self.props.actions.onChange) {
            self.props.actions.onChange(value);
          }
        }}
        onKeyPress={(event) => {
          if (self.props.disabled !== true && (event.key === enterKey || event.charCode === enterCharCode)) {
            event.preventDefault();
            self.props.actions.onSearch(self.value());
          }
        }} disabled={self.props.disabled}/>
    );
  }
}

SearchInput.propTypes = {
  style: React.PropTypes.object,

  disabled: React.PropTypes.bool,
  lastQuery: React.PropTypes.string,

  actions: React.PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    onChange: React.PropTypes.func,
    onSearch: React.PropTypes.func,
  }),

  usecases: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default SearchInput;
