
import { createSelector } from 'reselect';

const moduleName = 'network';

const showNetworkWarning = state => (state.getIn([moduleName, 'showNetworkWarning']) === true);

const isDialogDebouncing = state => (state.getIn([moduleName, 'isDialogDebouncing']) === true);
const isShowingAnyDialog = createSelector(showNetworkWarning, showWarning => showWarning === true);

export default {
  showNetworkWarning,
  isDialogDebouncing,
  isShowingAnyDialog,
};
