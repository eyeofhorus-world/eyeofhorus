
import Article from './article';
import Attribute from './attribute';

export default (providers, score, searchDirectory) => {
  const article = new Article(providers.article, score, searchDirectory);
  const attribute = new Attribute(score);

  return Object.assign({}, article, { attribute });
};
