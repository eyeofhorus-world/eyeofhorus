
import createAddUsecases from './add';
import createAttributesUsecases from './attributes';

export default (providers, shared, present) => {
  const validation = Object.assign({}, shared.article.validation, {
  });

  const add = createAddUsecases(providers, shared, present);
  const attributes = createAttributesUsecases(providers, present);

  return ({
    validation,
    add,
    attributes,
  });
};
