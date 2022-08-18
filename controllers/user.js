'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const validator = require('validator');

require('dotenv').config();

const User = require('../models/User');

// SIGNUP
exports.signup = (req, res) => {
  // check email validation
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: 'email format incorrect' });
  } else {
    // hash and salt email
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // crypt email
      const mailCrypt = cryptoJS
        .HmacSHA256(req.body.email, process.env.MAIL_KEY)
        .toString();
      user.email = mailCrypt;
      user
        .save()
        .then(() => res.status(201).json({ message: 'User create' }))
        .catch(error => res.status(400).json({ error }));
    });
  }
};

// LOGIN
exports.login = (req, res) => {
  const mailCrypt = cryptoJS
    .HmacSHA256(req.body.email, process.env.MAIL_KEY)
    .toString();
  // look for same crypt email
  User.findOne({ email: mailCrypt })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Incorrect email or password ' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            res.status(401).json({ message: 'Incorrect email or password ' });
          } else {
            res.status(200).json({
              userId: user._id,
              // create token
              token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
                expiresIn: '24h',
              }),
            });
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
