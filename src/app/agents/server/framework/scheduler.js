
import asyncPolling from 'async-polling';

import PromiseGroup from '../../../utilities/promise-group';

export default class Scheduler {
  constructor() {
    this.tasks = [];

    this.add = this.add.bind(this);
    this.periodic = this.periodic.bind(this);
  }
  
  add(task) {
    this.tasks.push(task);
  }

  periodic(intervalms, errorcb) {
    const self = this;
    const poller = asyncPolling((end) => {
      const promiseGroup = new PromiseGroup();
      self.tasks.forEach(task => promiseGroup.add(task()));
      return promiseGroup.finishAll({ unbox: true, noreject: true })
        .then(() => Promise.resolve({}), () => Promise.resolve({}))
        .then(() => {
          end();
        });
    }, intervalms);
    if (errorcb) {
      poller.on('error', errorcb);
    }
    poller.run();
  }
}
