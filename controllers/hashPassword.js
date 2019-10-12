const bcrypt = require('bcryptjs');
exports.hashPassword = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 5, (error, hash) => {
    console.log(req.body);
    if (error) {

      res.status(500).send(JSON.stringify({ error: 'Internal Server Error ' + req.body.password }));
    } else {
      console.log(hash)
      req.body.password = hash;
      res.end()
    }
  });
};

exports.getHashPassword = (password) => {
  return new Promise((success, failed) => {
    bcrypt.hash(password, 5, (error, hash) => {
      if (error) {
        failed(error);
      } else {
        success(hash);
      }
    });
  })
};
