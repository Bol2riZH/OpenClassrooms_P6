const Sauce = require('../models/Sauce');
const fs = require('fs');

// CREATE A NEW SAUCE
exports.createSauce = (req, res) => {
  // parse Json req to get a chain of string
  const sauceContent = JSON.parse(req.body.sauce);

  // delete _id (id is automaticly generate by BD)
  delete sauceContent._id;

  // delete the _userId (the one who create the sauce) > we use the userID of the token
  delete sauceContent._userId;

  const sauce = new Sauce({
    ...sauceContent,
    // get the userId from auth
    userId: req.auth.userId,
    // generate imageUrl from multer
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce added !' }))
    .catch(error => res.status(400).json({ message: 'error:' + error }));
};

// SHOW ALL THE SAUCES
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// SHOW THE SELECTED SAUCE
exports.getOneSauce = (req, res) => {
  Sauce.findById(req.params.id)
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

// MODIFY THE SAUCE
exports.updateSauce = (req, res) => {
  const sauceContent = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete sauceContent._userId;
  Sauce.findById(req.params.id).then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      Sauce.findByIdAndUpdate(req.params.id, {
        ...sauceContent,
        _id: req.params.id,
      })
        .then(() => res.status(200).json({ message: 'Sauce update !' }))
        .catch(error => res.status(401).json({ error }));
    }
  });
};

// DELETE THE SAUCE
exports.deleteSauce = (req, res) => {
  Sauce.findById(req.params.id).then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.findByIdAndDelete(req.params.id)
          .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
          .catch(error => res.status(401).json({ error }));
      });
    }
  });
};
