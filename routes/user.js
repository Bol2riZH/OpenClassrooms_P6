'use strict';

const express = require('express');
const router = express.Router();

const rateLimit = require('../middleware/rate-limit');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

// LOGIN RATE LIMIT ON 3 FAILS
router.post('/login', rateLimit, userCtrl.login);

module.exports = router;
