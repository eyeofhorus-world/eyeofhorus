/* eslint-disable new-cap, no-unused-vars, func-names */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import { schema as documentTagSchema } from '../../entities/document-tag';

import mongo from '../../helpers/mongo-helpers';

const documentSchema = mongoose.Schema({
  documentId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
    enum: documentTagSchema.documentTypes.asArray,
  },
  tagValue: {
    type: String,
    required: true,
  },
  documentTermFrequency: {
    type: Number,
    required: true,
  },
});

documentSchema.statics.createDocumentTag = function (documentType, documentId, tagValue, documentTermFrequency) {
  return mongo.findOrCreate(this, {
    documentType,
    documentId: mongoose.Types.ObjectId(documentId),
    tagValue,
  }, {
    documentType,
    documentId: mongoose.Types.ObjectId(documentId),
    tagValue,
    documentTermFrequency,
  }, { lean: true });
};

documentSchema.statics.forEachDocumentTag = function (onEachReturningPromise) {
  const query = {};
  return mongo.findMultipleByPredicate(this, query, {
    lean: true,
    cursor: true,
  }).then(
    cursor => cursor.eachAsync(doc => onEachReturningPromise(doc)),
    error => Promise.reject(error));
};

documentSchema.statics.howManyDocumentsContainTag = function (tagValue) {
  return mongo.countByPredicate(this, {
    tagValue,
  });
};

documentSchema.statics.findAllWithTagValue = function (tagValue) {
  const predicate = {
    tagValue,
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true });
};

documentSchema.statics.findAllTagsInDocument = function (documentType, documentId) {
  const predicate = {
    documentType,
    documentId: mongoose.Types.ObjectId(documentId),
  };
  return mongo.findMultipleByPredicate(this, predicate, { lean: true });
};

documentSchema.statics.removeDocumentTags = function (documentType, documentId) {
  const predicate = {
    documentType,
    documentId: mongoose.Types.ObjectId(documentId),
  };
  return mongo.removeAll(this, predicate);
};

export default mongoose.model('DocumentTag', documentSchema);
