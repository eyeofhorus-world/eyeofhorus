
import Attribute from './attribute';

export default (providers, shared, present) => {
  const attribute = new Attribute(providers.article, shared.article.validation, present);

  return ({
    attribute,
  });
};
