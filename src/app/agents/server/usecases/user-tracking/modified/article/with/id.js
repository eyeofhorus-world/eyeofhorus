
export default class UserTrackingModifiedArticleWithId {
  constructor(articleProvider, userTrackingViewed) {
    this.articleProvider = articleProvider;
    this.userTrackingViewed = userTrackingViewed;

    this.run = this.run.bind(this);
  }
  run(articleId, viewingAsUserId, userTrackingContext) {
    const self = this;
    return self.articleProvider.notifyArticleAsBeingUpdated(articleId).then(
      () => self.userTrackingViewed.article.with.id.run(articleId, viewingAsUserId, userTrackingContext));
  }
}
