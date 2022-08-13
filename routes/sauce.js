const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauce');

router.post('/', auth, saucesCtrl.addNewSauces);
router.get('/', auth, saucesCtrl.showListOfSauces);

module.exports = router;
