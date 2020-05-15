const { verify } = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  console.log(" token to Verify is now:")
  console.log(token)
  
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    verify(token, secret, (err, decoded) => {
      if (err) {
        // lets also check cookie..
        console.log("Cookie in err looks like");
        console.log(req.cookies);
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

  // // is called twice each with and without customer id on app and grocery pages
  // console.log("request from authenticate is: ");
  // // console.log("cookie state/JWTcustomerID in verify authentication is:");
  // // console.log(req);
  // const { JWTcustomerId } = req.cookies;
  // console.log("printing JWTcustomerID")
  //   console.log(JWTcustomerId);
  // if (JWTcustomerId && secret) { // THIS IS FALSE, 
  //   verify(JWTcustomerId, secret, (err, decoded) => {
  //     if (err) {
  //       console.log("No decoded JWT token found, clearing cookie")
  //       res.clearCookie('jwt');
  //       res.status(401).send(JSON.stringify({ msg: 'Auth verify failed: verification not decoded' }))
  //     } else {
  //       console.log(req.cookies)
  //       console.log("jwt token found, decoded is ")
  //       console.log(decoded)
  //       // sets customer id 
  //       req.userInfoDec = decoded;//add into request
  //       next();
  //     }
  //   });
  // } else res.status(401).send(JSON.stringify({ msg: 'Auth verify failed: customer id does not exist' }))
  //};