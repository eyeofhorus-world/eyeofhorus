
import ValidationQueryUsecase from './query';

export default () => {
  const query = new ValidationQueryUsecase();
  return ({
    query,
  });
};
