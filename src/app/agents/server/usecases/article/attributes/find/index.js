
import Some from './some';

export default (score, userTracking, articleFindAs) => {
  const some = new Some(score, userTracking, articleFindAs);

  return ({
    some,
  });
};
