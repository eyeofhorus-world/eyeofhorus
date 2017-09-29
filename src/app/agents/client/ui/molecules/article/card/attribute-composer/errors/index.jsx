
import { connect } from 'react-redux';

import arrayHelpers from '../../../../../../../../helpers/array-helpers';

import { selectors as articlesSelectors } from '../../../../../../framework/ducks/articles'; 

import strings from '../../../../../../framework/config/strings';

import View from './view';

const mapErrorCode = (usecases, reason) => {
  switch (reason) {
  case usecases.article.validation.quote.reasonTypes.NEEDS_TO_HAVE_CONTENT:
    return strings.articleAttributeComposerErrorWhitespace;
  case usecases.article.validation.quote.reasonTypes.CONTENT_TOO_LONG:
    return strings.articleAttributeComposerErrorLength;
  default:
    return null;
  }
};


const mapStateToProps = (state, ownProps) => ({
  messages: arrayHelpers.filterNulls(
    articlesSelectors.valueAttributeComposerInvalidReasons(ownProps.value).toJS().map(
      code => mapErrorCode(ownProps.usecases, code))),
});

const mapDispatchToProps = () => ({
  actions: {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
