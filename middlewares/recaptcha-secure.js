
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const { RECAPTCHA_URL, RECAPTCHA_SECRET_KEY } = require('../config');

/*
https://developers.google.com/recaptcha/docs/v3#site_verify_response
{
  "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
  "score": number             // the score for this request (0.0 - 1.0)
  "action": string            // the action name for this request (important to verify)
  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
  "error-codes": [...]        // optional
}
*/
module.exports = (req, res, next) => {
  res.locals.recaptcha = {};
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Skipping captcha (NODE_ENV=${process.env.NODE_ENV})`);
    return next();
  }

  const params = new URLSearchParams();
  params.append('secret', RECAPTCHA_SECRET_KEY);
  params.append('response', req.body.recaptchaToken);

  fetch(RECAPTCHA_URL, {
    method: 'POST',
    body: params,
  }).then(res => res.json()).then(data => {
    if (!data.success) {
      return next(new Error(`Recaptcha error: ${data['error-codes']}`));
    }

    res.locals.recaptcha = data;

    // Verified!
    next();
  }).catch(error => next({
    message: 'Unable to perform recaptcha request.',
    error,
  }));
};
