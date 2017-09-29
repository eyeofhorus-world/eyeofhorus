
import { taskTypes } from './internals/queue';

export default class SearchIndexStateWhenReady {
  constructor(queue) {
    this.queue = queue;

    this.run = this.run.bind(this);
  }
  run(promiseFactory) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.queue.add(taskTypes.search, (end) => {
        try {
          promiseFactory().then(
            (result) => {
              resolve(result);
              end();
            }, 
            (error) => {
              end();
              reject(error);
            });
        } catch (error) {
          end();
          reject(error);
        }
      });
    });
  }
}

