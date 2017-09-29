/* eslint-disable arrow-body-style */

export default {
  search: (query, skip) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/search',
      type: 'POST',
      data: {
        searchQuery: query,
        skip,
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.found) {
          resolve(data.found);
        } else {
          reject({
            message: 'Was not successful.',
          });
        }
      },
      error: (xhr, status, err) => {
        reject(err);
      },
    });
  }),
  mostRecent: (viewingAsUserId, dateFrom) => new Promise((resolve, reject) => {
    $.ajax({
      url: '/search/most-recent',
      type: 'POST',
      data: {
        dateFrom,
      },
      cache: false,
      success: (data) => {
        if (data && data.success === true && data.found) {
          resolve(data.found);
        } else {
          reject({
            message: 'Was not successful.',
          });
        }
      },
      error: (xhr, status, err) => {
        reject(err);
      },
    });
  }),
};
