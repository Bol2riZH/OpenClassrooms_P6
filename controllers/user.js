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
      if (!user)
        res.status(401).json({ message: 'Incorrect email or password ' });
      else res.status(200).json({ message: 'Connexion authorized' });
    })
    .catch(error => res.status(400).json({ error }));
};
