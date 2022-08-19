'use strict';

const rateLimit = require('express-rate-limit');

// DEFINE A LIMiT : 3 TIMES > BLOCK 1 MIN
module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min block
  max: 3, // limit each IP to 3 requests
  standardHeaders: true,
  legacyHeaders: false,
});
