
import Escaped from './escaped';
import Unescaped from './unescaped';

export default (articleProvider, validation, score, searchDirectory) => {
  const escaped = new Escaped(articleProvider, validation, score, searchDirectory);
  const unescaped = new Unescaped(escaped);

  return ({
    escaped,
    unescaped,
  });
};
