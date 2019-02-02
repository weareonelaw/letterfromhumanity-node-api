const express = require('express')
const router = express.Router();

const models = require('../models');

router.get('/', (req, res, next) => {
  console.log(models.sign);
  const sign = models.sign.create({
    firstName: req.query.first,
    lastName: req.query.last,
    email: req.query.email,
  }).then(sign => {
    res.send(sign);
  });
});

module.exports = router;
