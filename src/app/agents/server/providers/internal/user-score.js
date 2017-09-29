/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import { userScoreValueTypes } from '../../../../schemas/user-score';

import mongo from '../../helpers/mongo-helpers';

const userScoreSchema = mongoose.Schema({
  scoreId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  value: {
    type: String,
    required: true,
    enum: userScoreValueTypes.asArray,
  },
});

userScoreSchema.statics.findForScoreAndUser = function (scoreId, userId) {
  return mongo.findOneByPredicate(this, {
    userId: mongoose.Types.ObjectId(userId),
    scoreId: mongoose.Types.ObjectId(scoreId),
  }, { lean: true });
};

userScoreSchema.statics.removeAllUserScoresForScore = function (scoreId) {
  return mongo.removeAll(this, {
    scoreId: mongoose.Types.ObjectId(scoreId),
  });
};

userScoreSchema.statics.removeUserScore = function (userId, scoreId) {
  return mongo.removeAll(this, {
    userId: mongoose.Types.ObjectId(userId),
    scoreId: mongoose.Types.ObjectId(scoreId),
  });
};

userScoreSchema.statics.makeUserScore = function (userId, scoreId, userScoreValueType) {
  return mongo.updateOrCreate(this, {
    userId: mongoose.Types.ObjectId(userId),
    scoreId: mongoose.Types.ObjectId(scoreId),
  }, {
    userId: mongoose.Types.ObjectId(userId),
    scoreId: mongoose.Types.ObjectId(scoreId),
    value: userScoreValueType,
  }, (userScore) => {
    userScore.value = userScoreValueType; // eslint-disable-line no-param-reassign
  }, { lean: true });
};

userScoreSchema.statics.countByPredicate = function (predicate) {
  return mongo.countByPredicate(this, predicate);
};

export default mongoose.model('UserScore', userScoreSchema);
