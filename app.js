'use strict';

const express = require('express');

//CORS PACKAGE TO DEFINE HEADERS OPTION :
const cors = require('cors');
/*
default value :
{
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
*/

// path package define folder for images
const path = require('path');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

require('./models/DB-config');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

// SET A STATIC PATH TO IMAGE FOLDER
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
