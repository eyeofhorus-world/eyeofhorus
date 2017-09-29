
import Text from './text';
import Main from './main';
import MostRecent from './most-recent';

export default class Search {
  constructor(providers, article, searchIndex) {
    this.searchIndex = searchIndex;

    this.text = new Text(providers.corpus, providers.documentTag, providers.relevance, article);
    this.main = new Main(article, this.text);
    this.mostRecent = new MostRecent(providers.article, article);

    this.run = this.run.bind(this);
  }
  run(query, skip, viewingAsUserId = null) {
    const self = this;
    return self.searchIndex.state.whenReady.run(() => 
      self.main.run(query, skip, viewingAsUserId));
  }
}

