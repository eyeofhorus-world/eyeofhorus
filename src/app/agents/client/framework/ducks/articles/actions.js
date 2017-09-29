
import Immutable from 'immutable';
import { createAction } from 'redux-actions';

import { selectors as userSelectors, actions as userActions } from '../user';
import { actions as networkActions } from '../network';
import { actions as userTrackingActions, selectors as userTrackingSelectors } from '../user-tracking';

import types from './types';
import articlesSelectors from './selectors';

const onStartComposingAttribute = (dispatch, getState) => {
  if (userSelectors.isSignedIn(getState()) !== true) {
    userActions.onShowNeedToSignInWarning(dispatch);
  }
};

const onAddingAttributeValueValidityCheckingInProgress = createAction(types.ON_ADDING_ATTRIBUTE_VALUE_VALID_CHECKING_IN_PROGRESS, articleQuote => ({
  articleQuote,
}));
const onAddingAttributeValueValid = createAction(types.ON_ADDING_ATTRIBUTE_VALUE_VALID, articleQuote => ({
  articleQuote,
}));
const onAddingAttributeValueInvalid = createAction(types.ON_ADDING_ATTRIBUTE_VALUE_INVALID, (articleQuote, errors) => ({
  articleQuote,
  errors,
}));

const onAddingAttributeValueChanged = (dispatch, getState, usecases, article, attributeValue) => {
  const articleQuote = articlesSelectors.valueQuote(article);
  if (articleQuote) {
    dispatch(onAddingAttributeValueValidityCheckingInProgress(articleQuote));
    usecases.article.validation.quote.run(attributeValue).then(
      ({ invalidReasons, validatedQuote }) => Promise.resolve({ invalidReasons, validatedQuote }),
      () => Promise.resolve({
        invalidReasons: Immutable.fromJS([
          usecases.article.validation.quote.reasonTypes.NEEDS_TO_HAVE_CONTENT,
        ]),
      })).then(({ invalidReasons }) => {
        if (invalidReasons && invalidReasons.size > 0) {
          dispatch(onAddingAttributeValueInvalid(articleQuote, invalidReasons));
        } else {
          dispatch(onAddingAttributeValueValid(articleQuote));
        }
      });
  }
};


const onAddingAttributeStarted = createAction(types.ON_ADDING_ATTRIBUTE_STARTED, articleQuote => ({
  articleQuote,
}));

const onAddingAttributeSuccessful = createAction(types.ON_ADD_ATTRIBUTE_SUCCESSFUL, (articleQuote, addedAttribute) => ({
  articleQuote,
  addedAttribute,
}));

const onAddingAttributeFailedAuthentication = createAction(types.ON_ADD_ATTRIBUTE_FAILED_AUTHENTICATION, articleQuote => ({
  articleQuote,
}));

const onAddingAttributeFailedInvalidValue = createAction(types.ON_ADD_ATTRIBUTE_FAILED_INVALID_VALUE, (articleQuote, errors) => ({
  articleQuote,
  errors,
}));
  
const onAddingAttributeFailedOtherReason = createAction(types.ON_ADD_ATTRIBUTE_FAILED_OTHER_REASON, articleQuote => ({
  articleQuote,
}));

const onAddAttribute = (dispatch, getState, usecases, article, attributeValue) => {
  const articleQuote = articlesSelectors.valueQuote(article);
  if (articleQuote) {
    if (articlesSelectors.valueIsAddingAttributeInProgress(article) !== true) {
      dispatch(onAddingAttributeStarted(articleQuote));
    
      // timeout is needed otherwise the dispatching is too fast for some cases and causes presentation errors
      setTimeout(() => {
        dispatch(() => {
          const trackingContext = userTrackingSelectors.trackingContext(getState());
          usecases.article.add.attribute.run(trackingContext, articleQuote, attributeValue).then((addedAttribute) => {
            dispatch(userTrackingActions.onAddedAttribute());
            dispatch(onAddingAttributeSuccessful(articleQuote, addedAttribute));
          }, (error) => {
            if (error.type === usecases.article.add.attribute.errorTypes.authentication) {
              dispatch(onAddingAttributeFailedAuthentication(articleQuote));
              dispatch(userActions.onShowSessionExpiredWarning());
            } else if (error.type === usecases.article.add.attribute.errorTypes.invalidValue) {
              dispatch(onAddingAttributeFailedInvalidValue(articleQuote, error.reasons));
            } else {
              dispatch(onAddingAttributeFailedOtherReason(articleQuote));
            }
          });
        });
      }, 30);
    }
  }
};

const onScoreUpdated = createAction(types.ON_SCORE_UPDATED, score => ({
  score,
}));

const onUpVote = (dispatch, getState, usecases, score) => {
  if (userSelectors.isSignedIn(getState()) !== true) {
    userActions.onShowNeedToSignInWarning(dispatch);
  } else {
    const trackingContext = userTrackingSelectors.trackingContext(getState());
    usecases.score.vote.up.run(trackingContext, score, (modifiedScore) => {
      dispatch(onScoreUpdated(modifiedScore));
    }).then((modifiedScore) => {
      dispatch(userTrackingActions.onVotedUp());
      dispatch(onScoreUpdated(modifiedScore));
    }, (error) => {
      if (error.type === usecases.score.vote.up.errorTypes.authentication) {
        dispatch(userActions.onShowSessionExpiredWarning());
      } else {
        networkActions.onNetworkTrouble(dispatch);
      }
    });
  }
};

const onDownVote = (dispatch, getState, usecases, score) => {
  if (userSelectors.isSignedIn(getState()) !== true) {
    userActions.onShowNeedToSignInWarning(dispatch);
  } else {
    const trackingContext = userTrackingSelectors.trackingContext(getState());
    usecases.score.vote.down.run(trackingContext, score, (modifiedScore) => {
      dispatch(onScoreUpdated(modifiedScore));
    }).then((modifiedScore) => {
      dispatch(userTrackingActions.onVotedDown());
      dispatch(onScoreUpdated(modifiedScore));
    }, (error) => {
      if (error.type === usecases.score.vote.down.errorTypes.authentication) {
        dispatch(userActions.onShowSessionExpiredWarning());
      } else {
        networkActions.onNetworkTrouble(dispatch);
      }
    });
  }
};

const onShowMoreAttributesInProgress = createAction(types.SHOW_MORE_ATTRIBUTES_IN_PROGRESS, articleQuote => ({
  articleQuote,
}));

const onShowMoreAttributesFailed = createAction(types.SHOW_MORE_ATTRIBUTES_FAILED, articleQuote => ({
  articleQuote,
}));

const onShowMoreAttributesSuccess = createAction(types.SHOW_MORE_ATTRIBUTES_SUCCESS, (articleQuote, attributes, areThereMoreAttributes) => ({
  articleQuote,
  attributes,
  areThereMoreAttributes,
}));

const onShowMoreAttributes = (dispatch, usecases, article) => {
  dispatch((ignored, getState) => {
    const articleQuote = articlesSelectors.valueQuote(article);
    const numberOfAttributesShowing = articlesSelectors.valueNumberOfServerAttributesShowing(article);
    const trackingContext = userTrackingSelectors.trackingContext(getState());
    dispatch(onShowMoreAttributesInProgress(articleQuote));
    usecases.article.attributes.showMore.run(trackingContext, articleQuote, numberOfAttributesShowing).then(
      ({ attributes, areThereMoreAttributes }) => {
        dispatch(userTrackingActions.onShownMoreAttributes());
        dispatch(onShowMoreAttributesSuccess(articleQuote, attributes, areThereMoreAttributes));
      },
      () => {
        dispatch(onShowMoreAttributesFailed(articleQuote));
      });
  });
};

export default {
  onStartComposingAttribute,
  onAddingAttributeValueChanged,
  onAddAttribute,
  onUpVote,
  onDownVote,
  onShowMoreAttributes,
};

const onLoading = createAction(types.LOADING_IN_PROGRESS, () => ({}));

const onLoadingSuccess = createAction(types.LOADING_SUCCESS, (articles, isThereMore) => ({
  articles,
  isThereMore,
}));

const onLoadingFailed = createAction(types.LOADING_FAILED, () => ({}));

const onMoreLoading = createAction(types.MORE_IN_PROGRESS, () => ({
}));

const onMoreLoadingFailed = createAction(types.MORE_FAILED, () => ({
}));

const onMoreLoadingSuccess = createAction(types.MORE_SUCCESS, (articles, isThereMore) => ({
  articles,
  isThereMore,
}));

export const internal = {
  onLoading,
  onLoadingSuccess,
  onLoadingFailed,

  onMoreLoading,
  onMoreLoadingFailed,
  onMoreLoadingSuccess,
};
