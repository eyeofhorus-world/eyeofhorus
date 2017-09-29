
import requester from 'request';

export default accessToken => new Promise((resolve, reject) => {
  requester.get({
    uri: `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`,
    method: 'GET',
  },
  (error, response, body) => {
    if (error) {
      reject(error);
    } else if (response && response.statusCode !== 200) {
      reject({
        statusCode: response.statusCode,
      });
    } else {
      resolve(JSON.parse(body));
    }
  });
});
