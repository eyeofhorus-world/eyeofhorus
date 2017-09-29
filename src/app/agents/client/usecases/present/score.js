
import Immutable from 'immutable';

import scoreSchema from '../../../../schemas/score';
import userScoreSchema from '../../../../schemas/user-score';

import scorePresentationSchema from '../../schemas/score';

export default class PresentScore {
  constructor() {
    this.run = this.run.bind(this);
  }
  run(inputNullable) {
    const input = inputNullable || Immutable.fromJS(inputNullable);
    
    const convertFulfillmentType = (score) => {
      const upVoteCount = score.get('up'); 
      const downVoteCount = score.get('down');
      if (upVoteCount === downVoteCount) {
        return scorePresentationSchema.fulfillmentTypes.uncertain;
      } else if (upVoteCount > downVoteCount) {
        return scorePresentationSchema.fulfillmentTypes.yes;
      } else {
        return scorePresentationSchema.fulfillmentTypes.no;
      }
    };
    const convertDescriptionType = (score) => {
      switch (score.get('contextType')) {
      case scoreSchema.contextTypes.articleTruthful:
        return scorePresentationSchema.descriptionTypes.truthful;
      case scoreSchema.contextTypes.articleProducedBy:
      default:
        return scorePresentationSchema.descriptionTypes.none;
      }
    };
    const convertUpVoted = score => !!(score.getIn(['userScore', 'value']) === userScoreSchema.valueTypes.up);
    const convertDownVoted = score => !!(score.getIn(['userScore', 'value']) === userScoreSchema.valueTypes.down);

    return Promise.resolve(Immutable.fromJS({
      _id: input.get('_id'),
      disabled: false,
      fulfillmentType: convertFulfillmentType(input),
      descriptionType: convertDescriptionType(input),
      upVoteCount: input.get('up'),
      downVoteCount: input.get('down'),
      upVoted: convertUpVoted(input),
      downVoted: convertDownVoted(input),
    }));
  }
}
