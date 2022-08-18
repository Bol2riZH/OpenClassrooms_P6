const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
});
