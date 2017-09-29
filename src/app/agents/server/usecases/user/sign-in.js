
export default class UserSignInUsecase {
  constructor(userProvider) {
    this.userProvider = userProvider;

    this.run = this.run.bind(this);
  }

  run(email, displayName, providerId, accessToken, refreshToken) {
    return this.userProvider.createOrUpdateUser(
      email, displayName, providerId, accessToken, refreshToken);
  }
}
