const express = require('express');
const router = express.Router();
const cors = require('cors');
const { throttle } = require('lodash');

const corsOptions = require('../cors-options');
const models = require('../db/models');
const signaturesRoutes = require('./signatures');

const throttledSignaturesCount = throttle(() => {
  return models.Signature.count();
}, 2000, { leading: true, trailing: false });

router.get('/', cors(corsOptions.all), (req, res) => {
  res.send({
    ok: true,
    timestamp: (new Date()).getTime(),
  });
});

router.get('/stats', cors(corsOptions.all), async (req, res, next) => {
  res.send({
    signatures: await throttledSignaturesCount(),
    timestamp: (new Date()).getTime(),
  })
});

router.get('/health', cors(corsOptions.all), (req, res, next) => {
  models.sequelize.authenticate().then(() => {
    res.send({
      isHealthy: true,
      status: "ok",
      dbConnection: true,
      timestamp: (new Date()).getTime(),
    });
  }).catch(error => {
    res.send({
      isHealthy: false,
      status: "Unable to reach Database.",
      dbConnection: false,
      timestamp: (new Date()).getTime(),
      details: error,
    });
  });
});

router.use('/signatures', cors(corsOptions.protected), signaturesRoutes);

module.exports = router;
