const express = require('express')
const router = express.Router();

const models = require('../models');
const signsRoutes = require('./signs');

router.get('/', (req, res) => {
  res.send({
    ok: true,
    timestamp: (new Date()).getTime(),
  });
});

router.get('/stats', async (req, res, next) => {
  res.send({
    signs: await models.sign.count(),
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

router.use('/signs', signsRoutes);

module.exports = router;
