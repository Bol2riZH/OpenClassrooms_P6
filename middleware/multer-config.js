'use strict';

const multer = require('multer');

// DEFINE IMAGE FORMAT
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// SAVE IMAGE IN FOLDER
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(' ')
      .join('_') // remove space in file name
      .split('.') // remove extension from the file name
      .slice(0, -1)
      .join('.');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage: storage }).single('image');
