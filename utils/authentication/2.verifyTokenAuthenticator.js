const { verify } = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }


  if (token) {
    verify(token, secret, (err, decoded) => {
      console.log(err, 'ereoopppppp')
      if (err) {
        // lets also check cookie..

        console.log("Error when veryfiying authentication token");
        console.log(err);
        return res.status(401).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        console.log("Successfully verified authentication token==", decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log("auth token is not supplied");
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};




module.exports.verifyRefreshToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!Object.is(token, null)) {
    verify(token, secret, (err, decoded) => {
      if (err) {
        // lets also check cookie..
        console.log("Error when veryfiying authentication token");
        console.log(err);
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        console.log("Successfully refresh authentication token", decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    console.log("auth token is not supplied");
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};
