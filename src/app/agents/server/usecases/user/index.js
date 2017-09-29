
import UserIsAuthorizedUsecase from './is-authorized';
import UserSignInUsecase from './sign-in';
import UserSessionSerializeUsecase from './session-serialize';

export default (providers) => {
  const isAuthorized = new UserIsAuthorizedUsecase(
    providers.user, providers.idToken, providers.refreshedAccessToken);
  const signIn = new UserSignInUsecase(providers.user);
  const sessionSerialize = new UserSessionSerializeUsecase(providers.user);

  return {
    isAuthorized,
    signIn,
    sessionSerialize,
  };
};
