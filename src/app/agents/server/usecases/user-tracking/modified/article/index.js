
import createWithUsecases from './with';

export default (providers, userTrackingViewed) => {
  const withUsecases = createWithUsecases(providers, userTrackingViewed);
  
  return ({
    with: withUsecases,
  });
};
