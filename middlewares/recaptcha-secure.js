
const fetch = require('node-fetch');

const { RECAPTCHA_URL, RECAPTCHA_SECRET_KEY } = require('../config');

/*
https://developers.google.com/recaptcha/docs/verify
{
  "success": true|false,
  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
  "error-codes": [...]        // optional
}
*/
module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Skipping captcha (NODE_ENV=${process.env.NODE_ENV})`);
    return next();
  }

  fetch(RECAPTCHA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: RECAPTCHA_SECRET_KEY,
      response: req.body.recaptchaToken,
    }),
  }).then(res => res.json()).then(data => {
    if (!data.success) {
      return next(new Error(`Recaptcha error: ${data['error-codes']}`));
    }

    // Verified!
    next();
  }).catch(error => next({
    message: 'Unable to perform recaptcha request.',
    error,
  }));
};
