
import google from 'googleapis';

export default (googleClientId, googleClientSecret, refreshToken) => new Promise((resolve, reject) => {
  const oauthClient = new google.auth.OAuth2(
    googleClientId, googleClientSecret);
  oauthClient.setCredentials({
    refresh_token: refreshToken,
  });
  oauthClient.refreshAccessToken((err, tokens) => {
    if (err) {
      reject(err);
    } else {
      resolve(tokens ? tokens.access_token : null);
    }
  });
});
