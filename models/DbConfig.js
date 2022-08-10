const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://admin:admin@ocp6.melwwtt.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) console.log('Mongodb connected');
      else console.log('connection error:' + err);
    }
  );
  