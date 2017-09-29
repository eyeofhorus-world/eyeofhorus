
import Up from './up';
import Down from './down';

export default (providers, present) => {
  const up = new Up(providers.score, present);
  const down = new Down(providers.score, present);

  return ({
    up, 
    down,
  });
};
