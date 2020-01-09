const express = require('express')
const router = express.Router();

const recaptchaSecure = require('../middlewares/recaptcha-secure');
const models = require('../db/models');

router.post('/', recaptchaSecure, (req, res, next) => {
  models.Signature.create({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    location: req.body.location,
    targetPerson: req.body.targetPerson,
    recaptchaScore: res.locals.recaptcha.score,
  }).then(signature => {
    res.send({
      uuid: signature.uuid,
      created: signature.createdAt,
    });
  }).catch(next);
});

module.exports = router;
