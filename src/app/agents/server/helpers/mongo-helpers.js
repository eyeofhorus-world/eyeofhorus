/* eslint-disable arrow-body-style */

const findOneByPredicate = (context, predicate, { lean }) => new Promise((resolve, reject) => {
  let query = context.find(predicate);

  if (lean) {
    query = query.lean();
  }

  query.exec((error, found) => {
    if (error) {
      reject(error);
    } else {
      let output = null;
      if (found && found.length > 0) {
        output = found[0];
      }
      if (output && lean) {
        output = JSON.parse(JSON.stringify(output));
      }
      resolve(output);
    }
  });
});

const findMultipleByPredicate = (context, predicate, { sort, skip, limit, lean, cursor } = {}) => new Promise((resolve, reject) => {
  let query = context.find(predicate);

  if (skip) {
    query = query.skip(skip);
  }

  if (limit) {
    query = query.limit(limit);
  }

  if (sort) {
    query = query.sort(sort);
  }

  if (lean) {
    query = query.lean();
  }

  if (cursor) {
    resolve(query.cursor());
  } else {
    query.exec((error, found) => {
      if (error) {
        reject(error);
      } else {
        let output = found;
        if (lean) {
          output = JSON.parse(JSON.stringify(output));
        }
        resolve(output);
      }
    });
  }
});

const create = (context, predicate, { lean }) => {
  return new Promise((resolve, reject) => {
    context.create(predicate, (error, product) => {
      if (error) {
        reject(error);
      } else {
        let output = null;
        if (product) {
          output = product;
        }
        if (lean === true && product) {
          output = JSON.parse(JSON.stringify(
            output.toObject()));
        }
        resolve(output);
      }
    });
  });
};

const save = (context, objectNonLean, { lean }) => {
  if (objectNonLean) {
    return new Promise((resolve, reject) => {
      objectNonLean.save((error, savedObjectNonLean, numAffected) => { // eslint-disable-line
        if (error) {
          reject(error);
        } else {
          let output = null;
          if (lean === true) {
            if (savedObjectNonLean) {
              output = JSON.parse(JSON.stringify(savedObjectNonLean.toObject()));
            }
          } else {
            output = savedObjectNonLean;
          }
          resolve(output);
        }
      });
    });
  } else {
    return Promise.resolve(objectNonLean);
  }
};

const update = (context, predicate, updater, { lean }) => {
  return findOneByPredicate(context, predicate, { lean: false }).then(
    (object) => {
      if (updater) {
        updater(object);
      }
      return save(context, object, { lean });
    },
    error => Promise.reject(error));
};

const findOrCreate = (context, predicate, objectDesc, { lean }) => {
  return findOneByPredicate(context, predicate, { lean }).then(
    (found) => {
      if (found) {
        return Promise.resolve({ value: found, preexisting: true });
      } else {
        return create(context, objectDesc, { lean }).then(
          created => Promise.resolve({ value: created, preexisting: false }),
          error => Promise.reject(error));
      }
    },
    error => Promise.reject(error));
};

const updateOrCreate = (context, predicate, objectDesc, updater, { lean }) => {
  return findOneByPredicate(context, predicate, { lean: false }).then(
    (found) => {
      if (found) {
        if (updater) {
          updater(found);
        }
        return save(context, found, { lean });
      } else {
        return create(context, objectDesc, { lean });
      }
    },
    error => Promise.reject(error));
};

const removeAll = (context, predicate) => new Promise((resolve, reject) => {
  context.remove(predicate, (error, removed) => {
    if (error) {
      reject(error);
    } else {
      resolve(removed);
    }
  });
});

const countByPredicate = (context, predicate) => new Promise((resolve, reject) => {
  context.count(predicate, (error, count) => {
    if (error) {
      reject(error);
    } else {
      resolve(count || 0);
    }
  });
});

const distinctCount = (context, distinctFieldName, predicate = {}) => new Promise((resolve, reject) => {
  context.distinct(distinctFieldName, predicate, (error, values) => {
    if (error) {
      reject(error);
    } else {
      resolve(values ? values.length : 0);
    }
  });
});

const aggregate = (context, predicate, { lean } = {}) => new Promise((resolve, reject) => {
  context.aggregate(predicate, (error, values) => {
    if (error) {
      reject(error);
    } else {
      let output = values;
      if (lean) {
        output = JSON.parse(JSON.stringify(output));
      }
      resolve(output);
    }
  });
});

export default {
  findOneByPredicate,
  findMultipleByPredicate,
  create,
  save,
  update,
  findOrCreate,
  updateOrCreate,
  removeAll,
  countByPredicate,
  distinctCount,
  aggregate,
};
