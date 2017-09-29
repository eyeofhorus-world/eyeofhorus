
import { createAction } from 'redux-actions'; // eslint-disable-line no-unused-vars

import types from './types';

const onAddedAttribute = createAction(types.ON_ADDED_ATTRIBUTE, () => ({
}));

const onVotedUp = createAction(types.ON_VOTED_UP, () => ({
}));

const onVotedDown = createAction(types.ON_VOTED_DOWN, () => ({
}));

const onShownMoreAttributes = createAction(types.ON_SHOWN_MORE_ATTRIBUTES, () => ({
}));

const onNewSearch = createAction(types.ON_NEW_SEARCH, () => ({
}));

export default {
  onAddedAttribute,
  onVotedUp,
  onVotedDown,
  onShownMoreAttributes,
  onNewSearch,
};
