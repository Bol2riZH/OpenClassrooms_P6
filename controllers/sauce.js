const Sauce = require('../models/Sauce');

exports.addNewSauces = (req, res) => {
  delete req.body._id
  const sauce = new Sauce({
    ...req.body,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce added !' }))
    .catch(error => res.status(400).json({ message: 'error:' + error }));
};

exports.showListOfSauces = (req, res) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};
