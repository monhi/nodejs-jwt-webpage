let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || ''; // Express headers are auto converted to lowercase
  console.log("1");
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log(2);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.render("login");
  }
};

module.exports = {
  checkToken: checkToken
};
