const express = require('express');
const router = express.Router();
const { throttle } = require('lodash');

const models = require('../db/models');
const cors = require('../middlewares/cors');
const signaturesRoutes = require('./signatures');

const throttledSignaturesCount = throttle(() => {
  return models.Signature.count();
}, 2000, { leading: true, trailing: false });

router.get('/', (req, res) => {
  res.send({
    ok: true,
    timestamp: (new Date()).getTime(),
  });
});

router.get('/stats', async (req, res, next) => {
  res.send({
    signatures: await throttledSignaturesCount(),
    timestamp: (new Date()).getTime(),
  })
});

router.get('/health', (req, res, next) => {
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

router.use('/signatures', cors, signaturesRoutes);

module.exports = router;
