const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    console.log(user);
    user
      .save()
      .then(() => res.status(201).json({ message: 'User create' }))
      .catch(error => res.status(400).json({ error }));
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Incorrect email or password ' });
      }
      bcrypt.compare(req.body.password, user.password).then(valid => {
        if (!valid) {
          res.status(401).json({ message: 'Incorrect email or password ' });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, 'secretRamdomKey', {
            expiresIn: '24h',
          }),
        });
      });
    })
    .catch(error => res.status(400).json({ error }));
};
