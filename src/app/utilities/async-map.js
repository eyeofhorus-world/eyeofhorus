
import PromiseGroup from './promise-group';

export default (values, asyncMapper, resultMapper) => {
  const promiseGroup = new PromiseGroup();
  const results = [];
  (values || []).forEach((value) => {
    promiseGroup.add(asyncMapper(value).then((result) => {
      if (result) {
        results.push(resultMapper ? resultMapper(value, result) : result);
      }
      return Promise.resolve({});
    }));
  });
  return promiseGroup.finishAll().then(() => Promise.resolve(results));
};

