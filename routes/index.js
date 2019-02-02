const express = require('express')
const router = express.Router();
const uuidv4 = require('uuid/v4');

const models = require('../models');
const signsRoutes = require('./signs');

router.get('/stats', (req, res, next) => {
  res.send({
    signs: 99, // DUMMY
  })
});

router.use('/signs', signsRoutes);

module.exports = router;
