
import createValidationUsecases from './validation';

export default () => {
  const validation = createValidationUsecases();

  return ({
    validation,
  });
};
