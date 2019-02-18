const express = require('express')
const router = express.Router();

const models = require('../db/models');
const signaturesRoutes = require('./signatures');

router.get('/', (req, res) => {
  res.send({
    ok: true,
    timestamp: (new Date()).getTime(),
  });
});

router.get('/stats', async (req, res, next) => {
  res.send({
    signs: await models.Signature.count(),
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

router.use('/signs', signaturesRoutes);
router.use('/signatures', signaturesRoutes);

module.exports = router;
