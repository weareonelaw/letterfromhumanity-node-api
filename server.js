require('dotenv').load();
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const models = require('./models');
const routes = require('./routes');

const parse = require('pg-connection-string').parse;
const URL = parse(process.env.DATABASE_URL);
console.log(URL);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(logger('dev'));

const whiteList = ['https://weareonelaw.github.io'];
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        const error = new Error('Not allowed by CORS');
        error.status = 400;
        callback(error);
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
} else {
  console.log(`Skipping CORS checks (NODE_ENV=${process.env.NODE_ENV})`);
}

models.sequelize.authenticate().then(() => {
  console.log('✅ Connection to DB has been established.');

  models.sequelize.sync().then(() => {
    // Setup routes
    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        path: req.path,
        timestamp: (new Date()).getTime(),
        error: (app.get('env') === 'development') ? err : {},
      });
    });

    app.listen(config.PORT, () => {
      console.log(`✅ Server is listening on port ${config.PORT}`);
    });

  }).catch(err => {
    console.error('🔴 Sequelize sync() failed:', err);
  });
}).catch(err => {
  console.error('🔴 Sequelize authentication failed:', err);
});
