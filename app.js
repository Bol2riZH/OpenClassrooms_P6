const express = require('express');
const cors = require('cors');

require('./models/DbConfig');

const app = express();
app.use(cors());

module.exports = app;
