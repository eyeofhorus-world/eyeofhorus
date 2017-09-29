
import createAllCases from './all';

export default (providers) => {
  const all = createAllCases(providers);

  return ({
    all,
  });
};
