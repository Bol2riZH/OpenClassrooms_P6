const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res,next) => {
  try {
    // TODO check bearer !!!
    // take the token after bearer
    const token = req.headers.authorization.split(' ')[1];
    // verify the token with the key below
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    // set the token to user id
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
