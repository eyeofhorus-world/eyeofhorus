
import CleanArticles from './articles';
import CleanAttributes from './attributes';

const logProfilingMessages = false;

export default class SearchIndexCorpusBuildUsecase {
  constructor(articlesProvider, scoreProvider, article, score, searchIndexState) {
    this.cleanArticles = new CleanArticles(articlesProvider, article, score);
    this.cleanScores = new CleanAttributes(scoreProvider, article);
    this.searchIndexState = searchIndexState;

    this.run = this.run.bind(this);
  }
  run() {
    const self = this;
    return self.searchIndexState.inCleaning.run(() => {
      const t0 = process.hrtime();
      if (logProfilingMessages === true) {
        console.log('cleaning search index...'); // eslint-disable-line no-console
      }

      return self.cleanArticles.run()
        .then(() => self.cleanScores.run())
        .then(() => {
          if (logProfilingMessages === true) {
            const t1 = process.hrtime(t0);
            console.log(`search index cleaned in ${t1[0]}s ${t1[1] / 1000000}ms.`); // eslint-disable-line no-console 
          }
          return Promise.resolve({});
        });
    });
  }
}
