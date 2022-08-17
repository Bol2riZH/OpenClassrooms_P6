const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// use uniqueValidator plugin to check if email is not use more than once
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
