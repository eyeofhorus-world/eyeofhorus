/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import mongo from '../../helpers/mongo-helpers';

const articleSchema = mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

articleSchema.statics.findById = function (id) {
  return mongo.findOneByPredicate(this, { _id: mongoose.Types.ObjectId(id) }, { lean: true });
};

articleSchema.statics.findByQuote = function (quote) {
  return mongo.findOneByPredicate(this, { quote }, { lean: true });
};

articleSchema.statics.createArticle = function (quote) {
  return mongo.findOrCreate(this, { quote }, { quote }, { lean: true });
};

articleSchema.statics.getArticleCount = function () {
  return mongo.countByPredicate(this, {});
};

articleSchema.statics.forEachCreatedBetweenDates = function (dateFrom, dateTo, onEachReturningPromise) {
  const predicate = {
    createdAt: {
      $gte: dateFrom,
      $lt: dateTo,
    },
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true, cursor: true })
    .then(cursor => cursor.eachAsync(doc => onEachReturningPromise(doc)));
};

articleSchema.statics.deleteArticleWithId = function (id) {
  return mongo.removeAll(this, { _id: mongoose.Types.ObjectId(id) });
};

articleSchema.statics.findAllSortByUpdatedLastRecent = function ({ limit, dateFrom }) {
  const predicate = {
    updatedAt: {
      $lt: dateFrom || new Date(),
    },
  };
  const sortPredicate = [
    ['updatedAt', -1],
  ];
  return mongo.findMultipleByPredicate(this, predicate, { lean: true, limit, skip: 0, sort: sortPredicate });
};

articleSchema.statics.notifyArticleAsBeingUpdated = function (id) {
  return mongo.update(this, { 
    _id: mongoose.Types.ObjectId(id),
  }, (article) => {
    if (article) {
      article.updatedAt = undefined; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

export default mongoose.model('Article', articleSchema);
