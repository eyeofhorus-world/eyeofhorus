
export const promiseStatus = {
  resolved: 'resolved',
  rejected: 'rejected',
};

export const promiseGroupReturnUnbox = (valuesBoxedNullable) => {
  const valuesBoxed = valuesBoxedNullable || [];

  const values = [];
  let rejectPromise = null;
  valuesBoxed.forEach((valueBoxed) => {
    if (rejectPromise) {
      return;
    }
    switch (valueBoxed.status) {
    case promiseStatus.resolved:
      values.push(valueBoxed.v);
      break;
    case promiseStatus.rejected:
      rejectPromise = Promise.reject(valueBoxed.e);
      break;
    default:
      rejectPromise = Promise.reject({ 
        message: 'Unknown promise unboxing error', 
      });
      break;
    }
  });

  if (rejectPromise) {
    return rejectPromise;
  } else {
    return Promise.resolve(values);
  }
};

export const promiseGroupReturnUnboxNoReject = (valuesBoxedNullable) => {
  const valuesBoxed = valuesBoxedNullable || [];

  const values = [];
  valuesBoxed.forEach((valueBoxed) => {
    switch (valueBoxed.status) {
    case promiseStatus.resolved:
      values.push(valueBoxed.v);
      break;
    case promiseStatus.rejected:
      break;
    default:
      break;
    }
  });
  return Promise.resolve(values);
};

export default class PromiseGroup {
  constructor() {
    this.add = this.add.bind(this);
    this.finishAll = this.finishAll.bind(this);
    this.flush = this.flush.bind(this);

    this.flush();
  }

  add(promise) {
    this.promises.push(promise);
  }

  finishAll({ unbox, noreject } = { unbox: true, noreject: true }) {
    const self = this;

    this.add(Promise.resolve({}));

    const waitUntilAllPromisesComplete = () => {
      const reflect = promise => promise.then(
        v => ({ v, status: promiseStatus.resolved }),
        e => ({ e, status: promiseStatus.rejected }));

      const valuesBoxed = self.promises.map(reflect);
      valuesBoxed.pop();

      return Promise.all(valuesBoxed);
    };

    if (unbox === true) {
      if (noreject === true) {
        return waitUntilAllPromisesComplete()
          .then(valuesBoxed => promiseGroupReturnUnboxNoReject(valuesBoxed))
          .then(values => Promise.resolve(values));
      } else {
        return waitUntilAllPromisesComplete()
            .then(valuesBoxed => promiseGroupReturnUnbox(valuesBoxed))
            .then(values => Promise.resolve(values));
      }
    } else {
      return waitUntilAllPromisesComplete()
        .then(valuesBoxed => Promise.resolve(valuesBoxed));
    }
  }

  flush() {
    this.promises = [];
  }
}
