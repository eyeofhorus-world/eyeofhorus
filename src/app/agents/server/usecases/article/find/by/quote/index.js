
import Escaped from './escaped';
import Unescaped from './unescaped';

export default (providers, articleCreate, findById) => {
  const escaped = new Escaped(providers.article, articleCreate, findById);
  const unescaped = new Unescaped(escaped);
  return ({
    escaped, 
    unescaped,
  });
};
