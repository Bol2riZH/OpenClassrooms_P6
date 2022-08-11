const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  try {
    // take the token after bearer
    const token = req.headers.authorization.split(' ')[1];
    // verify the token with the key below
    const decodedToken = jwt.verify(token, 'secretRamdomKey');
    const userId = decodedToken.userId;
    // set the token to user id
    req.auth = {
      userId: userId,
    };
  } catch (error) {
    res.status(401).json({ error });
  }
};
