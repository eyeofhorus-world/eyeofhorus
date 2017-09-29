
import Article from './article';
import Attribute from './attribute';

export default (providers) => {
  const article = new Article(providers.documentTag);
  const attribute = new Attribute(providers.documentTag);

  return ({
    article,
    attribute,
  });
};
