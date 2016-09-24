var secret = require('../../secret');

module.exports = {
  SESSION_SECRET: secret.secret,
  GOOGLE: {
    clientID: secret.clientID,
    clientSecret: secret.clientSecret,
    callbackURL: secret.callbackURL
  },
  AWS: {
    accessKeyId: secret.AWSAccessKeyId,
    secretAccessKey: secret.AWSSecretAccessKey,
    region: secret.AWSRegion
  }
};
