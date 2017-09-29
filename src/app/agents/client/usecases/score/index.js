
import createVoteUsecases from './vote';

export default (providers, present) => {
  const vote = createVoteUsecases(providers, present);

  return ({
    vote,
  });
};
