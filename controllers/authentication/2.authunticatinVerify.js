const { verify } = require('jsonwebtoken');
module.exports = (req, res, next) => {
  console.log(111111112552,req.cookies.JWTcustomerId);
  
const { JWTcustomerId } = req.cookies;
  const secret = process.env.SECRET;
  if (JWTcustomerId && secret) {

    verify(JWTcustomerId, secret, (err, decoded) => {
      console.log(444444,decoded);
      
      if (decoded) {
        req.userInfoDec = decoded;//add into request
        console.log(7777,req.userInfoDec);
        
        next();
      } else {
        res.clearCookie('jwt');
        res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
      }
    });
  } else res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
};


