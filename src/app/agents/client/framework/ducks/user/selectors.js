
import { createSelector } from 'reselect';

const moduleName = 'user';


const id = state => state.getIn([moduleName, 'id']);

const email = state => state.getIn([moduleName, 'email']);

const displayName = state => state.getIn([moduleName, 'displayName']);


const isSignedIn = createSelector(
  id,
  userId => !!(userId && userId.length === '59a293bada032d081c8b71f2'.length),
);


const isDialogDebouncing = state => (state.getIn([moduleName, 'isDialogDebouncing']) === true);
const showNeedToSignIn = state => (state.getIn([moduleName, 'showNeedToSignIn']) === true);
const showSessionExpired = state => (state.getIn([moduleName, 'showSessionExpired']) === true);

const isShowingAnyDialog = createSelector(showNeedToSignIn, showSessionExpired, (needToSignIn, sessionExpired) => (
  needToSignIn === true || sessionExpired === true));

export default {
  id,
  email,
  displayName,
  isSignedIn,
  isDialogDebouncing,
  showNeedToSignIn,
  showSessionExpired,
  isShowingAnyDialog,
};
