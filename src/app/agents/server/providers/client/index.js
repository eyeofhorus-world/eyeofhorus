
import SearchProvider from './search';

export default searchPresenter => ({
  search: new SearchProvider(searchPresenter),
});
