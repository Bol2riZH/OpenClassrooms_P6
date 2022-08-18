'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// CHECK IF EMAIL IS UNIQUE
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
