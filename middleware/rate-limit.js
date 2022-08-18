'use strict';

const rateLimit = require('express-rate-limit');

// DEFINE A LIMiT : 3 TIMES > BLOCK 1 MIN
module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
});
