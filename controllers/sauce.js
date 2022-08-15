const Sauce = require('../models/Sauce');

exports.createSauce = (req, res) => {
  const sauce = new Sauce({
    ...req.body,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce added !' }))
    .catch(error => res.status(400).json({ message: 'error:' + error }));
};

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
  Sauce.findById(req.params.id)
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.updateSauce = (req, res) => {
  Sauce.findByIdAndUpdate(req.params.id, {
    ...req.body,
    _id: req.params.id,
  })
    .then(() => res.status(200).json({ message: 'Sauce update !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
  Sauce.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
    .catch(error => res.status(400).json({ error }));
};
