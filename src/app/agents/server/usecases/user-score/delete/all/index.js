
import createForCases from './for';

export default (providers) => {
  const forCases = createForCases(providers);

  return ({
    for: forCases,
  });
};
