const express = require('express')
const router = express.Router();

const recaptchaSecure = require('../middlewares/recaptcha-secure');
const models = require('../db/models');

router.post('/', recaptchaSecure, (req, res, next) => {
  models.Signature.create({
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    location: req.body.location,
    targetPerson: req.body.targetPerson,
  }).then(signature => {
    res.send({
      uuid: signature.uuid,
      created: signature.createdAt,
    });
  }).catch(next);
});

module.exports = router;
