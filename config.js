require('dotenv').load();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 4000,
  RECAPTCHA_URL: 'https://www.google.com/recaptcha/api/siteverify',
  RECAPTCHA_SECRET_KEY: '6Lc_rI4UAAAAAGLOaTkCNB4g8m6jRy244sUpfiuW',
};
