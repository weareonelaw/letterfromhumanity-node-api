require('dotenv').load();
const cors = require('cors');

const whiteList = [
  'http://localhost:4000',
  'https://weareonelaw.github.io',
];

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Skipping CORS checks (NODE_ENV=${process.env.NODE_ENV})`);
    return next();
  }

  cors({
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) === -1) {
        const error = new Error('Not allowed by CORS');
        error.status = 400;
        return callback(error, false);
      }

      return callback(null, true);
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })(req, res, next);
};
