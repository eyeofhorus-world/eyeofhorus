
export const taskTypes = {
  search: 'search',
  index: 'index',
  clean: 'clean',
};

/**
 * While the corpus is being built, 
 * search queries can't be run reliably.
 * 
 * So, indexing and searching, aka tasks,
 * are run in their own queue.
 * 
 * This also solves the problem of what happens if
 * the periodic task scheduler interval window is 
 * exceeded by the corpus building process.
 */
export default class TaskQueue {
  constructor() {
    this.tasks = [];
    this.busy = false;
    this.busyDoing = null;

    this.add = this.add.bind(this);
    this.flush = this.flush.bind(this);
  }

  add(taskType, task) {
    if (task && taskType) {
      if (taskType === taskTypes.index && (this.busyDoing === taskTypes.index ||
          this.tasks.some(someTask => someTask.type === taskTypes.index) === true)) {
        return; // eslint-disable-line no-useless-return
      } else if (taskType === taskTypes.clean && (this.busyDoing === taskTypes.clean ||
        this.tasks.some(someTask => someTask.type === taskTypes.clean) === true)) {
        return; // eslint-disable-line no-useless-return
      } else {
        this.tasks.push({
          type: taskType,
          value: task,
        });
        this.flush();
      }
    }
  }

  flush() {
    if (this.tasks.length) {
      if (this.busy !== true) {
        this.busy = true;
        const task = this.tasks.shift();
        if (task) {
          this.busyDoing = task.type;
          const self = this;
          task.value(() => {
            self.busy = false;
            self.busyDoing = null;
            self.flush();
          });
        } else {
          this.busy = false;
          this.flush();
        }
      }
    }
  }
}
