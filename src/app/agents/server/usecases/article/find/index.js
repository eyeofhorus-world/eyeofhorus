
import By from './by';

import createAsUsecases from './as';

export const createFindAsUsecases = (providers, score) => {
  const as = createAsUsecases(providers, score);

  return ({
    as,
  });
};

export const createFindByUsecases = (providers, score, articleAttributes, articleCreate) => {
  const by = new By(providers, score, articleAttributes, articleCreate);

  return ({
    by,
  });
};
