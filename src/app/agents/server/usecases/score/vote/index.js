
import Up from './up';
import Down from './down';

export default (providers, userScore, scoreFind, scoreReindex, userTracking) => {
  const up = new Up(userScore, scoreFind, scoreReindex, userTracking);
  const down = new Down(userScore, scoreFind, scoreReindex, userTracking);

  return ({
    up,
    down,
  });
};
