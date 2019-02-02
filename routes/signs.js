const express = require('express')
const router = express.Router();

const recaptchaSecure = require('../middlewares/recaptcha-secure');
const models = require('../models');

router.post('/', recaptchaSecure, (req, res, next) => {
  models.sign.create({
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    location: req.body.location,
  }).then(sign => {
    res.send({
      uuid: sign.uuid,
      created: sign.createdAt,
    });
  }).catch(next);
});

module.exports = router;
