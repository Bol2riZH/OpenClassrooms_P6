const express = require('express');
const cors = require('cors');
const path = require('path')

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

require('./models/DB-config');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

// answer to the localhost3000 request images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
