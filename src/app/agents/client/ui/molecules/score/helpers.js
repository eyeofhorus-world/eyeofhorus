
import numeral from 'numeral';

import fontIcons from '../../../framework/config/font-icons';
import strings from '../../../framework/config/strings';

import scorePresentationSchema from '../../../schemas/score';

export default {
  fulfillmentIcon: (fulfillmentType) => {
    switch (fulfillmentType) {
    case scorePresentationSchema.fulfillmentTypes.yes:
      return fontIcons.done;
    case scorePresentationSchema.fulfillmentTypes.no:
      return fontIcons.clear;
    case scorePresentationSchema.fulfillmentTypes.uncertain:
    default:
      return fontIcons.gesture;
    }
  },
  descriptionText: (descriptionType) => {
    switch (descriptionType) {
    case scorePresentationSchema.descriptionTypes.truthful:
      return strings.truthful;
    default:
      return null;
    }
  },
  voteNumberFormat: (vote) => {
    if (vote > 1000) {
      return numeral(vote || 0).format('0.000a');
    } else {
      return `${vote}`;
    }
  },
};
