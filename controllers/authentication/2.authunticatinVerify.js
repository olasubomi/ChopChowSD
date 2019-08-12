const { verify } = require('jsonwebtoken');
module.exports = (req, res, next) => {
  res.send('Auth');	
const { jwt } = req.cookies;
  const secret = process.env.SECRET;
  if (jwt && secret) {
    verify(jwt, secret, (err, decoded) => {
      if (decoded) {
        req.userInfoDec = decoded;//add into req
        next();
      } else {
        res.clearCookie('jwt');
        next({ code: 401, msg: 'you are not authenticated ' });
      }
    });
  } else next({ code: 401, msg: 'you are not authenticated ' });
};


