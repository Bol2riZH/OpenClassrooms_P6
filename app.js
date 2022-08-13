const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

require('./models/DbConfig');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
