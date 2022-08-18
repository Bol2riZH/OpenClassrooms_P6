'use strict';

const mongoose = require('mongoose');

require('dotenv').config();

// CONNECT TO DATA BASE
mongoose.connect(
  `mongodb+srv://admin:${process.env.PASS_DB}@ocp6.melwwtt.mongodb.net/test`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) console.log('Mongodb connected');
    else console.log('connection error:' + err);
  }
);
