require('dotenv').load();
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const models = require('./models');
const routes = require('./routes');

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

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
        timestamp: new Date(),
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
