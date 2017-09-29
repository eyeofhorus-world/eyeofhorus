/* eslint-disable arrow-body-style */

const internalErrorStatus = 500;
const authenticationErrorStatus = 403;

export default {
  getMoreAttributes: (articleQuote, skip, userTrackingContext) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/article/get/attributes',
      type: 'POST',
      data: {
        articleQuote,
        skip,
        userTrackingContext: JSON.stringify(userTrackingContext),
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.value) {
          resolve(data.value);
        } else {
          reject({});
        }
      },
      error: (xhr, status, err) => {
        reject({ xhr, status, err });
      },
    });
  }),
  addAttribute: (articleQuote, attributeQuote, userTrackingContext) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/article/add/attribute',
      type: 'POST',
      data: {
        articleQuote,
        attributeQuote,
        userTrackingContext: JSON.stringify(userTrackingContext),
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.attribute) {
          resolve(data.attribute);
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
