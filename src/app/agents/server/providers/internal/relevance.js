/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import mongo from '../../helpers/mongo-helpers';

const relevanceSchema = mongoose.Schema({
  contextWord: {
    type: String,
    required: true,
  },
  relatedWord: {
    type: String,
    required: true,
  },
  relationScore: {
    type: Number,
    required: true,
    min: 0,
  },
});

relevanceSchema.statics.incrementRelevance = function (contextWord, relatedWord, incrementAmount = 1) {
  const self = this;
  const predicate = {
    $or: [
      {
        contextWord,
        relatedWord,
      },
      {
        contextWord: relatedWord,
        relatedWord: contextWord,
      },
    ],
  };
  return mongo.updateOrCreate(self, predicate, { contextWord, relatedWord, relationScore: incrementAmount }, (relevance) => {
    if (relevance) {
      relevance.relationScore += incrementAmount; // eslint-disable-line no-param-reassign
    }
  }, { lean: true });
};

relevanceSchema.statics.relevanceOfWordToWords = function (contextWords, relatedWords) {
  const self = this;
  return mongo.aggregate(self, [
    {
      $match: {
        $or: [
          {
            contextWord: { $in: (contextWords || []) },
            relatedWord: { $in: (relatedWords || []) },
          },
          {
            contextWord: { $in: (relatedWords || []) },
            relatedWord: { $in: (contextWords || []) },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        relevanceScore: { $sum: '$relationScore' },
      },
    },
  ], { lean: true }).then((value) => {
    if (value) {
      return (value[0] || {}).relevanceScore || 0;
    } else {
      return 0;
    }
  });
};

export default mongoose.model('Relevance', relevanceSchema);
