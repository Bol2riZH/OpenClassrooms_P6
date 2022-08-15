const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

require('./models/DbConfig');

const app = express();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//     );
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//     );
//     next();
//   });

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
