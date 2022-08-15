const Sauce = require('../models/Sauce');

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
