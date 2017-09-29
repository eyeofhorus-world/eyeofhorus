
import createFindUsecases from './find';

export default (score, userTracking, articleFindAs) => {
  const find = createFindUsecases(score, userTracking, articleFindAs);

  return ({
    find,
  });
};
