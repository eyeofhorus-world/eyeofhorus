/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import { scoreContextTypes } from '../../../../schemas/score';

import mongo from '../../helpers/mongo-helpers';

import scoreSelectors from '../../entities/score';

const scoreSchema = mongoose.Schema({
  contextType: {
    type: String,
    required: true,
    enum: scoreContextTypes.asArray,
  },
  contextId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  subContextId: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  up: {
    type: Number,
    required: true,
    min: 0,
  },
  down: {
    type: Number,
    required: true,
    min: 0,
  },
  sideways: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

scoreSchema.statics.findById = function (id) {
  return mongo.findOneByPredicate(this, { _id: mongoose.Types.ObjectId(id) }, { lean: true });
};

scoreSchema.statics.findSingle = function (contextType, contextId) {
  return mongo.findOneByPredicate(this, {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
  }, { lean: true });
};

scoreSchema.statics.findAll = function (contextType, contextId, { limit, skip, ensureSubContextNotNull } = {
  ensureSubContextNotNull: true,
}) {
  const predicate = {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
  };
  if (ensureSubContextNotNull) {
    predicate.subContextId = { $exists: true, $ne: null };
  } else {
    predicate.subContextId = null;
  }
  const sortPredicate = [['up', -1], ['down', -1]];
  return mongo.findMultipleByPredicate(this, predicate, { lean: true, limit, skip, sort: sortPredicate });
};

scoreSchema.statics.hasFromSubcontextWithNonZeroScores = function (contextType, subContextId) {
  const predicate = {
    contextType,
    subContextId: mongoose.Types.ObjectId(subContextId),
    $or: [
      {
        up: { $gt: 0 },
      },
      {
        down: { $gt: 0 },
      },
    ],
  };
  return mongo.countByPredicate(this, predicate).then(count => Promise.resolve(count > 0));
};

scoreSchema.statics.createScore = function (contextType, contextId, subContextId = null, up = 0, down = 0, sideways = 0) {
  return mongo.findOrCreate(this, {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
    subContextId: subContextId ? mongoose.Types.ObjectId(subContextId) : undefined,
  }, {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
    subContextId: subContextId ? mongoose.Types.ObjectId(subContextId) : undefined,
    up,
    down,
    sideways,
  }, { lean: true });
};

scoreSchema.statics.deleteScoreById = function (scoreId) {
  return mongo.removeAll(this, { _id: mongoose.Types.ObjectId(scoreId) })
    .then(() => Promise.resolve(scoreId));
};

scoreSchema.statics.deleteScore = function (contextType, contextId) {
  const predicate = {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
  };
  const self = this;
  return mongo.findOneByPredicate(self, predicate, { lean: true })
    .then((score) => {
      const scoreId = scoreSelectors.id.get(score);
      if (scoreId) {
        return Promise.resolve(scoreId);
      } else {
        return Promise.resolve(null);
      }
    })
    .then((scoreId) => {
      if (scoreId) {
        return mongo.removeAll(self, { _id: mongoose.Types.ObjectId(scoreId) })
          .then(() => Promise.resolve(scoreId));
      } else {
        return Promise.resolve(null);
      }
    });
};

scoreSchema.statics.deleteAnyWith = function (itemId) {
  return mongo.removeAll(this, {
    $or: [ 
      {
        contextId: mongoose.Types.ObjectId(itemId),
      },
      {
        subContextId: mongoose.Types.ObjectId(itemId),
      },
    ],
  });
};

scoreSchema.statics.updateUpScore = function (scoreId, count) {
  return mongo.update(this, { 
    _id: mongoose.Types.ObjectId(scoreId),
  }, (score) => {
    if (score) {
      score.up = count; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

scoreSchema.statics.updateDownScore = function (scoreId, count) {
  return mongo.update(this, { 
    _id: mongoose.Types.ObjectId(scoreId),
  }, (score) => {
    if (score) {
      score.down = count; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

scoreSchema.statics.forEachZeroCreatedBetweenDatesWithContextType = function (contextType, dateFrom, dateTo, onEachReturningPromise) {
  const predicate = {
    contextType,
    createdAt: {
      $gte: dateFrom,
      $lt: dateTo,
    },
    $and: [
      {
        up: 0,
      },
      {
        down: 0,
      },
    ],
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true, cursor: true })
    .then(cursor => cursor.eachAsync(doc => onEachReturningPromise(doc)));
};

scoreSchema.statics.forEachNonZeroInContext = function (contextType, contextId, onEachReturningPromise) {
  const predicate = {
    contextType,
    contextId: mongoose.Types.ObjectId(contextId),
    subContextId: { $exists: true, $ne: null },
    $or: [
      {
        up: { $gt: 0 },
      },
      {
        down: { $gt: 0 },
      },
    ],
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true, cursor: true })
    .then(cursor => cursor.eachAsync(doc => onEachReturningPromise(doc)));
};

export default mongoose.model('Score', scoreSchema);
