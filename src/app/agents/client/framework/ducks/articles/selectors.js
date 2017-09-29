
import Immutable from 'immutable'; // eslint-disable-line no-unused-vars
import { createSelector } from 'reselect'; // eslint-disable-line no-unused-vars

const moduleName = 'articles';

const isLoading = state => state.getIn([moduleName, 'loading']) === true;
const isLoadingMore = state => state.getIn([moduleName, 'loadingMore']) === true;
const didLoadingMoreFail = state => state.getIn([moduleName, 'loadingMoreFailed']) === true;

const values = state => (state.getIn([moduleName, 'values']) || Immutable.fromJS([]));
const valuesCount = state => (state.getIn([moduleName, 'values']) || Immutable.fromJS([])).size;
const isThereMore = state => (state.getIn([moduleName, 'isThereMore']) === true);
const valuesLast = createSelector(values, articles => articles.last() || Immutable.fromJS({}));
const valuesLastUpdatedAt = createSelector(valuesLast, articleLast => new Date(articleLast.get('updatedAt') || undefined));

const valueId = value => ((value || Immutable.fromJS({})).get('_id'));
const valueQuote = value => ((value || Immutable.fromJS({})).get('quote'));
const valueEstimatedSize = value => ((value || Immutable.fromJS({})).get('estimatedSize') || 0);
const valueTruthfulScore = value => ((value || Immutable.fromJS({})).get('truthful'));
const valueAttributes = value => ((value || Immutable.fromJS({})).get('attributes') || Immutable.fromJS([]));
const valueAreThereMoreAttributes = value => ((value || Immutable.fromJS({})).get('areThereMoreAttributes') === true);

const valueIsShowingMoreAttributesInProgress = value => ((value || Immutable.fromJS({})).get('attributeShowMoreInProgress') === true);
const valueAttributeShowMoreFailed = value => ((value || Immutable.fromJS({})).get('attributeShowMoreFailed') === true);
const valueNumberOfServerAttributesShowing = createSelector(valueAttributes, attributes => attributes.count(attribute => attribute.get('addedOnTheUserSide') !== true));

const valueIsAddingAttributeInProgress = value => ((value || Immutable.fromJS({})).get('attributeAddingInProgress') === true);
const valueAddingAttributeFailed = value => ((value || Immutable.fromJS({})).get('attributeAddingFailed') === true);
const valueDidAttributeAddFailDueToNetwork = value => ((value || Immutable.fromJS({})).get('attributeAddingFailedDueToNetwork') === true);
const valueAttributeComposerInvalidReasons = value => ((value || Immutable.fromJS({})).get('attributeAddingFailedReasons') || Immutable.fromJS([]));
const valueAttributeComposerIsValueInvalid = createSelector(
  valueAttributeComposerInvalidReasons, 
  reasons => reasons.size > 0);

const attributeId = value => ((value || Immutable.fromJS({})).get('_id'));
const attributeName = value => ((value || Immutable.fromJS({})).get('quote') || '');
const attributeScore = value => ((value || Immutable.fromJS({})).get('score') || Immutable.fromJS({}));

const scoreDisabled = value => (value || Immutable.fromJS({})).get('disabled');
const scoreFulfillmentType = value => (value || Immutable.fromJS({})).get('fulfillmentType');
const scoreDescriptionType = value => (value || Immutable.fromJS({})).get('descriptionType');
const scoreUpVoteCount = value => (value || Immutable.fromJS({})).get('upVoteCount');
const scoreDownVoteCount = value => (value || Immutable.fromJS({})).get('downVoteCount');
const scoreUpVoted = value => (value || Immutable.fromJS({})).get('upVoted');
const scoreDownVoted = value => (value || Immutable.fromJS({})).get('downVoted');

export default {
  isLoading,
  isLoadingMore,
  values,
  valuesCount,
  valuesLast,
  valuesLastUpdatedAt,
  isThereMore,
  didLoadingMoreFail,
  
  valueId,
  valueQuote,
  valueEstimatedSize,
  valueTruthfulScore,
  valueAttributes,
  valueAreThereMoreAttributes,
  valueIsShowingMoreAttributesInProgress,
  valueAttributeShowMoreFailed,
  
  valueNumberOfServerAttributesShowing,
  valueIsAddingAttributeInProgress,
  valueAddingAttributeFailed,
  valueDidAttributeAddFailDueToNetwork,
  valueAttributeComposerInvalidReasons,
  valueAttributeComposerIsValueInvalid,

  attributeId,
  attributeName,
  attributeScore,

  scoreDisabled,
  scoreFulfillmentType,
  scoreDescriptionType,
  scoreUpVoteCount,
  scoreDownVoteCount,
  scoreUpVoted,
  scoreDownVoted,
};
