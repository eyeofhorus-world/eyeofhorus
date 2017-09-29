/* eslint-disable new-cap, no-unused-vars, func-names, no-param-reassign */

/*
 * Have to actually import the default mongoose instead of by selectively,
 * because selective import will mess up 'this'
 */
import mongoose from 'mongoose';

import mongo from '../../helpers/mongo-helpers';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  ticket: {
    providerId: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
});

userSchema.statics.findByProviderId = function (providerId) {
  return mongo.findOneByPredicate(this, { 'ticket.providerId': providerId }, { lean: true });
};

userSchema.statics.findUserByEmailNonLean = function (email) {
  return mongo.findOneByPredicate(this, { email }, { lean: true });
};

userSchema.statics.createOrUpdateUser = function (email, displayName, providerId, accessToken, refreshToken, callback) {
  return mongo.updateOrCreate(this, { email }, {
    email,
    displayName,
    ticket: {
      providerId,
      accessToken,
      refreshToken,
    },
  }, (user) => {
    user.displayName = displayName;
    user.ticket.providerId = providerId;
    user.ticket.accessToken = accessToken;

    if (refreshToken) {
      user.ticket.refreshToken = refreshToken;
    }
  }, { lean: true });
};

userSchema.statics.mutateAccessToken = function (user, newAccessToken) {
  return mongo.update(this, { email: user.email }, (userToModify) => {
    userToModify.ticket.accessToken = newAccessToken;
  }, { lean: true });
};

export default mongoose.model('User', userSchema);
