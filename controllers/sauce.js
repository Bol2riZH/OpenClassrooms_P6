'use strict';

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

// SHOW ALL SAUCES
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// SHOW SELECTED SAUCE
exports.getOneSauce = (req, res) => {
  Sauce.findById(req.params.id)
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

// MODIFY SAUCE
exports.updateSauce = (req, res) => {
  const sauceContent = req.file
    ? {
        // parse to be able to update image
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

// DELETE SAUCE
exports.deleteSauce = (req, res) => {
  Sauce.findById(req.params.id).then(sauce => {
    // check userId
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const filename = sauce.imageUrl.split('/images/')[1];
      // remove image from folder
      fs.unlink(`images/${filename}`, () => {
        // delete sauce from DB
        Sauce.findByIdAndDelete(req.params.id)
          .then(() => res.status(200).json({ message: 'Sauce deleted !' }))
          .catch(error => res.status(401).json({ error }));
      });
    }
  });
};

// LIKE OR DISLIKE SAUCE
exports.likedSauce = (req, res) => {
  Sauce.findById(req.params.id)
    .then(sauce => {
      switch (req.body.like) {
        case 0:
          // look over the userLiked array for current userId
          if (sauce.usersLiked.includes(req.auth.userId)) {
            // return index of userId in liked array
            const indexOfUser = sauce.usersLiked.indexOf(req.auth.userId);
            Sauce.findByIdAndUpdate(req.params.id, {
              ...sauce,
              likes: sauce.likes--,
              // remove current userId from liked array
              usersLiked: sauce.usersLiked.splice(indexOfUser, 1),
            })
              .then(() => res.status(200).json({ message: 'Sauce unliked' }))
              .catch(error => res.status(401).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.auth.userId)) {
            const indexOfUser = sauce.usersDisliked.indexOf(req.auth.userId);
            Sauce.findByIdAndUpdate(req.params.id, {
              ...sauce,
              dislikes: sauce.dislikes--,
              usersDisliked: sauce.usersDisliked.splice(indexOfUser, 1),
            })
              .then(() => res.status(200).json({ message: 'Sauce undisliked' }))
              .catch(error => res.status(401).json({ error }));
          }
          break;
        case 1:
          Sauce.findByIdAndUpdate(req.params.id, {
            ...sauce,
            likes: sauce.likes++,
            usersLiked: sauce.usersLiked.push(req.auth.userId),
          })
            .then(() => res.status(200).json({ message: 'Sauce liked !' }))
            .catch(error => res.status(401).json({ error }));
          break;
        case -1:
          Sauce.findByIdAndUpdate(req.params.id, {
            ...sauce,
            dislikes: sauce.dislikes++,
            usersDisliked: sauce.usersDisliked.push(req.auth.userId),
          })
            .then(() => res.status(200).json({ message: 'Sauce disliked...' }))
            .catch(error => res.status(401).json({ error }));
          break;
      }
    })
    .catch(error => res.status(401).json({ error }));
};
