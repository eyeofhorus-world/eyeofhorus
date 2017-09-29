
import Document from './document';
import Article from './article';

export default (providers) => {
  const document = new Document(providers.documentTag);

  const article = new Article(providers.score, providers.article, document);
  
  return ({
    article,
  });
};
