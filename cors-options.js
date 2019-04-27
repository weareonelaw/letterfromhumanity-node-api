require('dotenv').load();

const whiteList = [
  'https://weareonelaw.github.io',
  process.env.CORS_ALLOW_ORIGIN,
];

module.exports = {
  origin: (origin, callback) => {
    console.log("Testing origin ", origin);
    if (whiteList.indexOf(origin) === -1) {
      const error = new Error('Not allowed by CORS');
      error.status = 400;
      return callback(error, false);
    }

    return callback(null, true);
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
