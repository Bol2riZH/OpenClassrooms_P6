const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauce');

router.post('/', saucesCtrl.addNewSauces);
router.get('/', saucesCtrl.showListOfSauces);

module.exports = router;
