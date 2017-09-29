/* eslint-disable arrow-body-style */

const internalErrorStatus = 500;
const authenticationErrorStatus = 403;

export default {
  voteUp: (scoreId, userTrackingContext) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/score/vote/up',
      type: 'POST',
      data: {
        scoreId,
        userTrackingContext: JSON.stringify(userTrackingContext),
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.score) {
          resolve(data.score);
        } else {
          reject({});
        }
      },
      error: (xhr, status, err) => {
        reject({ xhr, status, err });
      },
    });
  }),
  voteDown: (scoreId, userTrackingContext) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/score/vote/down',
      type: 'POST',
      data: {
        scoreId,
        userTrackingContext: JSON.stringify(userTrackingContext),
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.score) {
          resolve(data.score);
        } else {
          reject({});
        }
      },
      error: (xhr, status, err) => {
        reject({ xhr, status, err });
      },
    });
  }),
  isAuthenticationError: (error) => {
    let xhrStatus = internalErrorStatus;
    if (error) {
      const xhr = error.xhr;
      if (xhr) {
        const xhrStatusValue = xhr.status;
        if (xhrStatusValue) {
          xhrStatus = xhrStatusValue;
        }
      }
    }
    return (xhrStatus === authenticationErrorStatus);
  },
};
