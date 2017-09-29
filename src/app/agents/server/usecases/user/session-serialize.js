
export default class UserSessionSerializeUsecase {
  constructor(userProvider) {
    this.userProvider = userProvider;

    this.serialize = this.serialize.bind(this);
    this.deserialize = this.deserialize.bind(this);
  }

  serialize(deserializedUser) {
    const serializedUser = deserializedUser.ticket.providerId;
    return Promise.resolve(serializedUser);
  }

  deserialize(serializedUser) {
    return this.userProvider.findByProviderId(serializedUser);
  }
}
