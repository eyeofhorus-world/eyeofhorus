
import Score from './score';
import Attribute from './attribute';
import Article from './article';

export default () => {
  const score = new Score();
  const attribute = new Attribute(score);
  const article = new Article(attribute, score);

  return ({
    score,
    attribute,
    article,
  });
};
