
import { createFindByUsecases, createFindAsUsecases } from './find';
import createAttributesUsecases from './attributes';
import createAddUsecases from './add';
import createArticleDeleteUsecases from './delete';

import ArticleCreateUsecase from './create';

export default (providers, shared, score, searchDirectory, userTracking) => {
  const validation = Object.assign({}, shared.article.validation);
  const create = new ArticleCreateUsecase(providers.article, validation, score, searchDirectory);
  const findAs = createFindAsUsecases(providers, score);
  const articleAttributes = createAttributesUsecases(score, userTracking, findAs.as);
  const find = Object.assign({}, findAs, createFindByUsecases(providers, score, articleAttributes, create));
  const deleter = createArticleDeleteUsecases(providers.article, score, searchDirectory);
  const add = createAddUsecases(find, score, searchDirectory, userTracking);

  return ({
    validation,
    attributes: articleAttributes,
    find,
    create,
    delete: deleter,
    add,
  });
};
