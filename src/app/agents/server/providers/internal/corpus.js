/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import mongo from '../../helpers/mongo-helpers';

const tokenSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  inverseDocumentFrequency: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

tokenSchema.statics.createWord = function (wordValue) {
  return mongo.findOrCreate(this, { 
    value: wordValue, 
  }, { 
    value: wordValue, 
    inverseDocumentFrequency: 0, 
    position: 0,
  }, { lean: true });
};

tokenSchema.statics.updatePositionOfWord = function (tokenId, position) {
  return mongo.update(this, { 
    _id: mongoose.Types.ObjectId(tokenId),
  }, (token) => {
    if (token) {
      token.position = position; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

tokenSchema.statics.updateIdfOfWord = function (tokenId, idf) {
  return mongo.update(this, { 
    _id: mongoose.Types.ObjectId(tokenId),
  }, (token) => {
    if (token) {
      token.inverseDocumentFrequency = idf; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

tokenSchema.statics.forEachWordSortedAlphabetically = function (onEachReturningPromise) {
  const query = {};
  return mongo.findMultipleByPredicate(this, query, {
    sort: { value: 1 },
    lean: true,
    cursor: true,
  }).then(
    cursor => cursor.eachAsync(doc => onEachReturningPromise(doc)),
    error => Promise.reject(error));
};

tokenSchema.statics.doAnyOfTheseWordsExist = function (words) {
  const predicate = {
    value: { $in: (words || []) },
  };
  return mongo.findOneByPredicate(this, predicate, { lean: true }).then(
    value => Promise.resolve(!!value),
    error => Promise.reject(error));
};

tokenSchema.statics.findAllWordsWhichAreOrCanBeExpandedFromThisWord = function (token) {
  const predicate = {
    value: { $regex: `^${token}` },
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true });
};

tokenSchema.statics.findWithValue = function (wordValue) {
  return mongo.findOneByPredicate(this, { value: wordValue }, { lean: true });
};

tokenSchema.statics.deleteAllWords = function () {
  return mongo.removeAll(this, {});
};

export default mongoose.model('CorpusWord', tokenSchema);
