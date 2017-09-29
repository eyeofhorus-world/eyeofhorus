
export default class SearchProvider {
  constructor(searchPresenter) {
    this.searchPresenter = searchPresenter;
  }
  search(query, skip, viewingAsUserId) {
    return this.searchPresenter.onSearch(query, skip, viewingAsUserId);
  }
  mostRecent(viewingAsUserId) {
    return this.searchPresenter.onMostRecent(viewingAsUserId);
  }
}
