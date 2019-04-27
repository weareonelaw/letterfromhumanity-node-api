require('dotenv').load();

const whiteList = [
  'https://weareonelaw.github.io',
  process.env.CORS_ALLOW_ORIGIN,
];

module.exports = {
  all: {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  protected: {
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) === -1) {
        const error = new Error('Not allowed by CORS');
        error.status = 400;
        return callback(error, false);
      }

      return callback(null, true);
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
}
