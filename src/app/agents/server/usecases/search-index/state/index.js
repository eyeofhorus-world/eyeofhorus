

import Queue from './internals/queue';

import InProgress from './in-progress';
import InCleaning from './in-cleaning';
import WhenReady from './when-ready';

export default () => {
  const queue = new Queue();
  
  const inProgress = new InProgress(queue);
  const inCleaning = new InCleaning(queue);
  const whenReady = new WhenReady(queue);

  return ({
    inProgress,
    inCleaning,
    whenReady,
  });
};
