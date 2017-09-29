
import { connect } from 'react-redux';

import { selectors as searchSelectors, actions as searchActions } from '../../../../framework/ducks/search';

import View from './view';

const mapStateToProps = state => ({
  lastQuery: searchSelectors.lastQuery(state),
  disabled: searchSelectors.inProgress(state) === true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    onChange: (value) => {
      dispatch((ignored, getState) => {
        searchActions.onQueryChanged(dispatch, getState, ownProps.usecases, value);
      });
    },
    onSearch: () => {
      dispatch((ignored, getState) => {
        searchActions.onSearch(dispatch, getState, ownProps.usecases, ownProps.router);
      });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
