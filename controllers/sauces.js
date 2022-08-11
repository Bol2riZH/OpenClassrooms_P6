const Sauce = require('../models/Sauce');

exports.addNewSauces = (req, res) => {
  const sauce = new Sauce({
    ...sauce,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce added !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.showListOfSauces = (req, res) => {
  Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};
