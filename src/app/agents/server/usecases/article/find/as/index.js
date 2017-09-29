
import createAttributeUsecases from './attribute';

export default (providers, score) => {
  const attribute = createAttributeUsecases(providers, score);

  return ({
    attribute,
  });
};
