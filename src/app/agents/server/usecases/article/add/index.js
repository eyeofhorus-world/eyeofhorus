
import Attribute from './attribute';

export default (articleFind, score, searchDirectory, userTracking) => {
  const attribute = new Attribute(articleFind, score, searchDirectory, userTracking);

  return ({
    attribute,
  });
};
