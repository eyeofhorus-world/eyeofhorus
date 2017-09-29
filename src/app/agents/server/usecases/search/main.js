
import Immutable from 'immutable';

import PromiseGroup from '../../../../utilities/promise-group';

import arrayHelpers from '../../../../helpers/array-helpers';
import { unescape } from '../../../../helpers/string-helpers';

import articleSelectors from '../../entities/article';

const maxResultsPerQuery = 10;

export default class SearchMainUsecase {
  constructor(article, textSearch) {
    this.article = article;

    this.textSearch = textSearch;

    this.run = this.run.bind(this);
    this.bestMatch = this.bestMatch.bind(this);
    this.articleFindClassifier = this.articleFindClassifier.bind(this);
    this.generalTextClassifier = this.generalTextClassifier.bind(this);
    this.hydrate = this.hydrate.bind(this);
    this.pagify = this.pagify.bind(this);
    this.whatsMissing = this.whatsMissing.bind(this);
    this.fill = this.fill.bind(this);
  }
  run(query, skip, viewingAsUserId = null) {
    const self = this;
    return self.bestMatch(query)
      .then(({ value, classor }) => self.pagify(value, skip)
        .then(({ filteredResults, isThereMore }) => Promise.resolve({ value: filteredResults, classor, isThereMore })))

      .then(({ value, classor, isThereMore }) => self.hydrate(value, viewingAsUserId)
        .then(articles => Promise.resolve({ articles, classor, isThereMore })))

      .then(({ articles, classor, isThereMore }) => self.whatsMissing(query, skip, articles, classor)
        .then(shouldCreateArticle => Promise.resolve({ articles, shouldCreateArticle, isThereMore })))

      .then(({ articles, shouldCreateArticle, isThereMore }) => self.fill(query, viewingAsUserId, articles, shouldCreateArticle)
        .then(results => Promise.resolve(Object.assign({}, results, { isThereMore }))));
  }
  bestMatch(query) {
    const promiseGroup = new PromiseGroup();
    const classificationResults = [];
    [
      this.articleFindClassifier(),
      this.generalTextClassifier(),
    ].forEach((classor, index) => {
      promiseGroup.add(classor.classify(query).then(
        ({ isQueryAppropriateToClass, translatedQuery }) => {
          if (isQueryAppropriateToClass === true) {
            classificationResults.push({ key: index, classor, translatedQuery });
          }
          return Promise.resolve({});
        }));
    });
    return promiseGroup.finishAll().then(() => {
      let classor;
      if (classificationResults.length > 0) {
        classor = arrayHelpers
          .sortArrayByKeyAsNumber(classificationResults)
          .map(value => (Object.assign({}, value.classor, { translatedQuery: value.translatedQuery })))[0];
      }
      if (classor) {
        return classor.processor(classor.translatedQuery).then(value => Promise.resolve({ 
          value, 
          classor,
        }));
      } else {
        return Promise.reject({ message: 'Appropriate classor wasn\'t found' });
      }
    });
  }
  articleFindClassifier() {
    return ({
      isQueryArticleContent: false,
      classify: (value) => {
        const articleIdMoniker = 'articleId:"';
        const idStringLength = '59a293bada032d081c8b71f2'.length;
        if (value && value.startsWith(articleIdMoniker)) {
          return Promise.resolve({
            isQueryAppropriateToClass: true,
            translatedQuery: value
              .slice(value.indexOf(articleIdMoniker) + articleIdMoniker.length)
              .substr(0, idStringLength),
          });
        }
        return Promise.resolve({
          isQueryAppropriateToClass: false,
        });
      },
      processor: translatedQuery => Promise.resolve([translatedQuery]),
    });
  }
  generalTextClassifier() {
    const self = this;
    return ({
      isQueryArticleContent: true,
      classify: value => Promise.resolve({
        isQueryAppropriateToClass: true,
        translatedQuery: value,
      }),
      processor: translatedQuery => self.textSearch.run(translatedQuery),
    });
  }
  pagify(results, skip) {
    return Promise.resolve(results || Immutable.fromJS([])).then(value => Promise.resolve({
      filteredResults: value.filter((thisValue, index) => (
        (index - skip) >= 0 && (index - skip) < maxResultsPerQuery)),
      isThereMore: ((value.size - skip) > maxResultsPerQuery),
    }));
  }
  hydrate(articlesDehydrated, viewingAsUserId) {
    const self = this;
    const promiseGroup = new PromiseGroup();

    const articles = [];
    (articlesDehydrated || Immutable.fromJS([])).forEach((articleId, index) => {
      promiseGroup.add(self.article.find.by.id.run(articleId, viewingAsUserId).then((article) => {
        if (article) {
          articles.push({ key: index, value: article });
        }
      }));
    });
    
    return promiseGroup.finishAll({ unbox: true, noreject: true }).then(() => Promise.resolve(
      arrayHelpers.sortArrayByKeyAsNumber(articles).map(articleBoxed => articleBoxed.value)));
  }
  whatsMissing(query, skip, articles, classor) {
    return Promise.resolve(skip === 0 && classor.isQueryArticleContent === true && 
      articles.some(article => unescape(articleSelectors.quote.get(article)) === query) !== true);
//      articles.some(article => unescape(articleSelectors.quote.get(article) || '').toLowerCase() === (query || '').toLowerCase()) !== true);
  }
  fill(query, viewingAsUserId, articles, shouldCreateArticle) {
    const self = this;
    if (shouldCreateArticle === true) {
      return self.article.find.by.quote.unescaped.run(query, viewingAsUserId).then((article) => {
        if (article) {
          return Promise.resolve({ articles: [].concat.apply([], [[article], articles || []]) });
        } else {
          return Promise.resolve({ articles });
        }
      }, () => Promise.resolve({ articles }));
    } else {
      return Promise.resolve({ articles });
    }
  }
}
