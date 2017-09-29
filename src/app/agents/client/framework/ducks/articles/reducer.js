
import Immutable from 'immutable';

import types from './types'; // eslint-disable-line no-unused-vars

const initialState = Immutable.fromJS({
  loading: false,
  loadingFailed: false,
  loadingMore: false,
  loadingMoreFailed: false,
  values: [],
  isThereMore: false,
});

const concatAttributes = (attributes, moreAttributes) => {
  const attributesUpdated = attributes.map((attribute) => {
    const attributeQuote = attribute.get('quote');
    const updatedAttributeIndex = moreAttributes.findIndex(value => value.get('quote') === attributeQuote);
    if (updatedAttributeIndex >= 0) {
      return moreAttributes.get(updatedAttributeIndex);
    } else {
      return attribute;
    }
  });

  const moreAttributesFilteredOfUpdates = moreAttributes.filter(moreAttribute => (attributesUpdated.some(attribute => attribute.get('quote') === moreAttribute.get('quote')) !== true));

  return attributesUpdated.concat(moreAttributesFilteredOfUpdates);
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.ON_ADDING_ATTRIBUTE_VALUE_VALID_CHECKING_IN_PROGRESS: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('failedReasons', Immutable.fromJS([]))));
    } else {
      return state;
    }
  }
  case types.ON_ADDING_ATTRIBUTE_VALUE_VALID: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('failedReasons', Immutable.fromJS([]))));
    } else {
      return state;
    }
  }
  case types.ON_ADDING_ATTRIBUTE_VALUE_INVALID: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('failedReasons', action.payload.errors)));
    } else {
      return state;
    }
  }

  case types.ON_ADDING_ATTRIBUTE_STARTED: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeAddingFailedReasons', Immutable.fromJS([]))
        .set('attributeAddingFailed', false)
        .set('attributeAddingFailedDueToNetwork', false)
        .set('attributeAddingInProgress', true)));
    } else {
      return state;
    }
  }
  case types.ON_ADD_ATTRIBUTE_SUCCESSFUL: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      const value = state.get('values').get(valueIndex);
      const attributeQuote = action.payload.addedAttribute.get('quote');
      let attributes = value.get('attributes');
      if (attributes.some(attribute => attribute.get('quote') === attributeQuote) !== true) {
        attributes = attributes.unshift(action.payload.addedAttribute.set('addedOnTheUserSide', true));
      }
      return state.set('values', state.get('values').set(valueIndex, value
        .set('attributes', attributes)
        .set('attributeAddingFailed', false)
        .set('attributeAddingInProgress', false)));
    } else {
      return state;
    }
  }
  case types.ON_ADD_ATTRIBUTE_FAILED_INVALID_VALUE: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeAddingFailedReasons', action.payload.errors)
        .set('attributeAddingFailed', true)
        .set('attributeAddingInProgress', false)));
    } else {
      return state;
    }
  }
  case types.ON_ADD_ATTRIBUTE_FAILED_AUTHENTICATION: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeAddingFailed', true)
        .set('attributeAddingInProgress', false)));
    } else {
      return state;
    }
  }
  case types.ON_ADD_ATTRIBUTE_FAILED_OTHER_REASON: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeAddingFailed', true)
        .set('attributeAddingFailedDueToNetwork', true)
        .set('attributeAddingInProgress', false)));
    } else {
      return state;
    }
  }

  case types.ON_SCORE_UPDATED: {
    const modifiedScore = action.payload.score || Immutable.fromJS({});
    const modifiedScoreId = modifiedScore.get('_id');
    
    const updateScore = (score) => {
      const scoreId = score.get('_id');
      if (modifiedScoreId === scoreId) {
        return score
          .set('fulfillmentType', modifiedScore.get('fulfillmentType'))
          .set('upVoteCount', modifiedScore.get('upVoteCount'))
          .set('downVoteCount', modifiedScore.get('downVoteCount'))
          .set('upVoted', modifiedScore.get('upVoted'))
          .set('downVoted', modifiedScore.get('downVoted'));
      } else {
        return score;
      }
    };

    return state.set('values', state.get('values').map(value => value
      .set('truthful', updateScore(value.get('truthful')))
      .set('attributes', value.get('attributes').map(attribute => attribute.set('score', updateScore(attribute.get('score')))))));
  }

  case types.LOADING_IN_PROGRESS:
    return state.set('loading', true)
      .set('loadingFailed', false)
      .set('values', Immutable.fromJS([]))
      .set('isThereMore', false);
  case types.LOADING_FAILED:
    return state.set('loading', false)
      .set('loadingFailed', true);
  case types.LOADING_SUCCESS:
    return state.set('loading', false)
      .set('values', (action.payload.articles || Immutable.fromJS([])).map(value => value
        .set('attributeShowMoreInProgress', false)
        .set('attributeAddingInProgress', false)
        .set('attributeAddingFailed', false)
        .set('attributeAddingFailedDueToNetwork', false)
        .set('attributeAddingFailedReasons', Immutable.fromJS([]))))
      .set('isThereMore', action.payload.isThereMore === true);

  case types.MORE_IN_PROGRESS:
    return state.set('loadingMore', true)
      .set('loadingMoreFailed', false);
  case types.MORE_FAILED:
    return state.set('loadingMore', false)
      .set('loadingMoreFailed', true);
  case types.MORE_SUCCESS:
    return state.set('loadingMore', false)
      .set('values', state.get('values').concat((action.payload.articles || Immutable.fromJS([])).map(value => value
        .set('attributeShowMoreInProgress', false)
        .set('attributeAddingInProgress', false)
        .set('attributeAddingFailed', false)
        .set('attributeAddingFailedDueToNetwork', false)
        .set('attributeAddingFailedReasons', Immutable.fromJS([])))))
      .set('isThereMore', action.payload.isThereMore === true);

  case types.SHOW_MORE_ATTRIBUTES_IN_PROGRESS: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeShowMoreInProgress', true)
        .set('attributeShowMoreFailed', false)));
    } else {
      return state;
    }
  }
  case types.SHOW_MORE_ATTRIBUTES_FAILED: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeShowMoreInProgress', false)
        .set('attributeShowMoreFailed', true)));
    } else {
      return state;
    }
  }
  case types.SHOW_MORE_ATTRIBUTES_SUCCESS: {
    const valueIndex = state.get('values').findIndex(value => value.get('quote') === action.payload.articleQuote);
    if (valueIndex >= 0) {
      return state.set('values', state.get('values').set(valueIndex, state.get('values').get(valueIndex)
        .set('attributeShowMoreInProgress', false)
        .set('attributeShowMoreFailed', false)
        .set('areThereMoreAttributes', action.payload.areThereMoreAttributes)
        .set('attributes', concatAttributes(state.get('values').get(valueIndex).get('attributes'), action.payload.attributes || Immutable.fromJS([])))));
    } else {
      return state;
    }
  }

  default:
    return state;
  }
};
