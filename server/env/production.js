module.exports = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    GOOGLE: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    AWS: {
      accessKeyId: process.env.AWS_AccessKeyId,
      secretAccessKey: process.env.AWS_SecretAccessKey,
      region: process.env.AWS_Region
    }
};
