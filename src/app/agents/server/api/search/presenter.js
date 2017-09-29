
export default class SearchPresenter {
  constructor(usecases) {
    this.usecases = usecases;
  }
  onSearch(query, skip, viewingAsUserId) {
    const unescapedQuery = unescape(query);
    return this.usecases.search.run(unescapedQuery, skip, viewingAsUserId);
  }
  onMostRecent(viewingAsUserId) {
    return this.usecases.search.mostRecent.run(viewingAsUserId);
  }
}
