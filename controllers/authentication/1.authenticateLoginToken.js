const { checkEmail_admin, checkEmail_customer, checkEmail_supplier} = require("../../db/dbPostgress/queries/authentication/checkEmail");


const { jwt, sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const chalk = require('chalk');

exports.authenticateLoginToken = (req, res, next) => {

  // We want to refactor this s there is much less redundancy, that is, combine admin, customer and supplier login to ease debugging
  // let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  // console.log("Authenticate login token looks like")
  // console.log(token)

  // if (token.startsWith('Bearer ')) {
  //     // Remove Bearer from string
  //     token = token.slice(7, token.length);
  // }
  const memberInfo = { ...req.body };
  if (memberInfo) {
    checkEmail_admin(memberInfo.email).then((result) => {
        // console.log(chalk.red("___found admin email______"), result);
        if (result.rows[0]) {
          console.log("Expected password is: "+ result.rows[0].password);
          console.log("Given password is: "+ memberInfo.password);

          bcrypt.compare( memberInfo.password, result.rows[0].password, (err, valid) => {
              console.log(  "response with admin id in create login token is: ");
              console.log(result.rows[0]);
              console.log("valid is: "+ valid);
              if (valid) {
                const { id, username, email } = { ...result.rows[0] };
                const userInfoEnc = { id, username, email };

                console.log("userInfoEnc", userInfoEnc);
                // console.log('secret',process.env.SECRET);
                sign(userInfoEnc, process.env.SECRET,
                  {
                    expiresIn: "1h", // expires in 24hours secs
                  },
                  (err, token) => {
                    console.log("signed json token is");
                    console.log("token:", token);                    
                    // If authentication is successful,
                    // the server should create a JWT token else establishes an error response
                    if (err) return res.json({ err });
                    res.json({
                      error: null, success: true, message: "Authentication successful!", token: token, customerID: id, role:'admin',
                    });
                  }
                );
              } 
              else {
                res.status(403).send( JSON.stringify({ success: false,  message: "Incorrect password", }));
              }
            }
          );
        } else {
          // res.status(400).send({success: false,message:"email/username non-existent in db records. Please check the request", });
          checkEmail_customer(memberInfo.email).then((result) => {
            if (result.rows[0]) {
                bcrypt.compare( memberInfo.password, result.rows[0].password, (err, valid) => {
                  console.log(  "response with customer id in create login token is: ");
                  console.log(result.rows[0]);
    
                  if (valid) {
                    const { id, username, email } = { ...result.rows[0] };
                    const userInfoEnc = { id, username, email };
    
                    console.log("userInfoEnc", userInfoEnc);
                    // console.log('secret',process.env.SECRET);
                    sign(userInfoEnc, process.env.SECRET,
                      {
                        expiresIn: "1h", // expires in 24hours secs
                      },
                      (err, token) => {
                        console.log("signed json token is");
                        console.log("token:", token);                    
                        // If authentication is successful,
                        // the server should create a JWT token else establishes an error response
                        if (err) return res.json({ err });
                        res.json({
                          error: null, success: true, message: "Authentication successful!", token: token, customerID: id, role:'customer',
                        });
                      }
                    );
                  } 
                  else {
                    res.status(403).send( JSON.stringify({ success: false,  message: "Incorrect password", }));
                  }
                }
              );
            }else{
              checkEmail_supplier(memberInfo.email).then((result) => {
                if (result.rows[0]) {
                    bcrypt.compare( memberInfo.password, result.rows[0].password, (err, valid) => {
                      console.log(  "response with supplier id in create login token is: ");
                      console.log(result.rows[0]);
        
                      if (valid) {
                        const { id, username, email } = { ...result.rows[0] };
                        const userInfoEnc = { id, username, email };
        
                        console.log("userInfoEnc", userInfoEnc);
                        // console.log('secret',process.env.SECRET);
                        sign(userInfoEnc, process.env.SECRET,
                          {
                            expiresIn: "1h", // expires in 24hours secs
                          },
                          (err, token) => {
                            console.log("signed json token is");
                            console.log("token:", token);                    
                            // If authentication is successful,
                            // the server should create a JWT token else establishes an error response
                            if (err) return res.json({ err });
                            res.json({
                              error: null, success: true, message: "Authentication successful!", token: token, customerID: id, role:'supplier',
                            });
                          }
                        );
                      } 
                      else {
                        res.status(403).send( JSON.stringify({ success: false,  message: "Incorrect password", }));
                      }
                    }
                  );
                }else{
                  res.status(400).send({success: false,message:"email/username non-existent in db records. Please check the request", });
                }   
              });       
            }               
          });
        }
      })
      .catch((err) => {
        console.log("Caught some issue within then statement");
        console.log(err);
        res.status(400).send(JSON.stringify({ msg: "Ensure you enter validly data in your email ", }));
      });
  } else {
    console.log("Member info does not exists in db");

    res
      .status(401)
      .send(JSON.stringify({ msg: "you not authrized in this page" }));
  }
};
