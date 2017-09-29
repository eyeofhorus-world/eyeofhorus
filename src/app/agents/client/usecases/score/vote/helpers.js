
import scorePresentationSchema from '../../../schemas/score';

const toggleUp = (score) => {
  const currentUpVoteValue = score.get('upVoted');

  const newUpVoteState = !currentUpVoteValue;

  let newUpVoteCount = score.get('upVoteCount');
  if (newUpVoteState === true) {
    newUpVoteCount += 1;
  } else {
    newUpVoteCount -= 1;
  }

  return Promise.resolve(score
    .set('upVoted', newUpVoteState)
    .set('upVoteCount', newUpVoteCount));
};

const toggleDown = (score) => {
  const currentDownVoteValue = score.get('downVoted');

  const newDownVoteState = !currentDownVoteValue;

  let newDownVoteCount = score.get('downVoteCount');
  if (newDownVoteState === true) {
    newDownVoteCount += 1;
  } else {
    newDownVoteCount -= 1;
  }

  return Promise.resolve(score
    .set('downVoted', newDownVoteState)
    .set('downVoteCount', newDownVoteCount));
};

const reset = (score) => {
  const upVoted = score.get('upVoted');
  if (upVoted) {
    return toggleUp(score);
  } else {
    const downVoted = score.get('downVoted');
    if (downVoted) {
      return toggleDown(score);
    } else {
      return Promise.resolve(score);
    }
  }
};

const refigureFulfillment = (input) => {
  const convertFulfillmentType = (score) => {
    const upVoteCount = score.get('upVoteCount'); 
    const downVoteCount = score.get('downVoteCount');
    if (upVoteCount === downVoteCount) {
      return scorePresentationSchema.fulfillmentTypes.uncertain;
    } else if (upVoteCount > downVoteCount) {
      return scorePresentationSchema.fulfillmentTypes.yes;
    } else {
      return scorePresentationSchema.fulfillmentTypes.no;
    }
  };
  return Promise.resolve(input.set('fulfillmentType', convertFulfillmentType(input)));
};

export default {
  reset,
  toggleUp,
  toggleDown,
  refigureFulfillment,
};
