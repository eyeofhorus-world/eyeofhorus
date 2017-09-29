
import Attribute from './attribute';

export default (providers) => {
  const attribute = new Attribute(providers.score);
  
  return ({
    attribute,
  });
};
