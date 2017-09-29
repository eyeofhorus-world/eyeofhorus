
const filterNulls = (values) => {
  const output = [];
  if (values && values.forEach) {
    values.forEach((value) => {
      if (value) {
        output.push(value);
      }
    });
  }
  return output;
};

const findOrCreate = (values, { predicate, notFoundValue }) => {
  let output = null;
  
  if (predicate && values && values.forEach) {
    values.forEach((value) => {
      if (output) {
        return;
      }
      if (predicate(value) === true) {
        output = value;
      }
    });
  }

  if (output) {
    return output;
  } else if (notFoundValue) {
    return notFoundValue;
  } else {
    return null;
  }
};

const findByPredicate = (values, predicate, defaultValue = null) => {
  let output = defaultValue;
  if (predicate && values && values.forEach) {
    values.forEach((value) => {
      if (output) {
        return;
      }
      if (predicate(value) === true) {
        output = value;
      }
    });
  }
  return output;
};

const removeByPredicate = (values, predicate) => {
  const output = [];
  if (values && values.forEach) {
    values.forEach((value) => {
      if (predicate(value) !== true) {
        output.push(value);
      }
    });
  }
  return output;
};

const sortArrayByKeyAsNumber = (valueNullable) => {
  const value = valueNullable || [];
  return value.sort((a, b) => {
    const aKey = a.key || 0;
    const bKey = b.key || 0;
    if (aKey < bKey) {
      return -1;
    } else if (aKey > bKey) {
      return 1;
    } else {
      return 0;
    }
  });
};

const skip = (values, skipCount) => {
  const output = [];
  if (values && values.forEach) {
    values.forEach((value, index) => {
      if (index >= skipCount) {
        output.push(value);
      }
    });
  }
  return output;
};

const limit = (values, limitCount) => {
  const output = [];
  if (values && values.forEach) {
    values.forEach((value, index) => {
      if (index < limitCount) {
        output.push(value);
      }
    });
  }
  return output;
};

export default {
  filterNulls,
  findOrCreate,
  findByPredicate,
  removeByPredicate,
  sortArrayByKeyAsNumber,
  skip,
  limit,
};
