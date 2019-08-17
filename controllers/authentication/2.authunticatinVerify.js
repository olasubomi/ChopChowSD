const { verify } = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const { JWTcustomerId } = req.cookies;
  const secret = process.env.SECRET;
  if (JWTcustomerId && secret) {
    verify(JWTcustomerId, secret, (err, decoded) => {
      if (decoded) {
        req.userInfoDec = decoded;//add into request
        next();
      } else {
        res.clearCookie('jwt');
        res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
      }
    });
  } else res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
};

