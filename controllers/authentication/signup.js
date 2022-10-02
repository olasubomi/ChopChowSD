const { checkEmailUser, checkValideToken } = require('../../db/dbPostgress/queries/authentication/checkEmail');
const pool = require('../../db/dbPostgress/config/db_connection')
const {customer_grocery_list} = require('../../db/dbMongo/config/db_buildSchema')
const { getHashPassword } = require('../hashPassword')
const { sign } = require('jsonwebtoken')
const { signUpEmail, forgotPasswordEmail, passwordResetEmail } = require('../../mailer/nodemailer');
const crypto = require("crypto");

exports.resetPassword = (req, res, next) => {
    const { token, password1, password2 } = req.body;
    if (password1.trim() !== password2.trim()) {
        res.status(400).send(JSON.stringify({ msg: 'Password does not match.' }))
    } else {
        checkValideToken(token).then(result => {
            if (result.rows[0]) {
                getHashPassword(password1)
                    .then((hashedPass) => {
                        let sql = {
                            text: `UPDATE customer set password=$1, passwordtoken='' where id=$2`,
                            values: [hashedPass, result.rows[0].id]
                        };

                        pool.query(sql).then(data => {
                            passwordResetEmail(result.rows[0].email);
                            res.status(200).send(JSON.stringify({ msg: 'Your password has reset.', done: true }))
                        }, e => {
                            console.log(e)
                        })

                    }).catch((e) => {
                        console.log(e)

                        res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
                    })
            } else {
                res.status(400).send(JSON.stringify({ msg: 'Token does not exist or expired.' }))
            }
        }).catch(e => {
            res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
        });
    }
};

exports.forgotPassword = (req, res, next) => {
    console.log("Comes in forgot password");
    const { email, username } = req.body;
    // Check username as well when testing forgot password
    checkEmailUser(email).then((result) => {
        if (result.rows[0]) {
            let token = crypto.randomBytes(20).toString('hex');

            let sql = {
                text: 'UPDATE customer SET passwordtoken=$1 WHERE id=$2 RETURNING passwordtoken',
                values: [token, result.rows[0].id]
            };

            pool.query(sql).then(data => {
                //let id  = data.rows[0].id;
                let resetLink = req.headers.origin + '/resetpass?token=' + data.rows[0].passwordtoken
                forgotPasswordEmail(email, resetLink);
                res.status(200).send(JSON.stringify({ msg: 'Email with reset link has been sent to you.', done: true }))
            }, e => {
                console.log(e)
            })
        } else {
            res.status(400).send(JSON.stringify({ msg: 'Your email does not exist bro.' }))
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
    })
};

exports.signupCustomer = (req, res, next) => {
    const { email, password, username, phone, emailNotification } = req.body;

    console.log("Email is: "+email);
    
    var [account, address] = email.split('@');
    var domainParts = address.split('.');
   
     //   Email verification
     if (
         (/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email) ||
        email === "" ) && email.length < 256 && account.length < 64 && 
        domainParts.some(function (part) {
            return part.length < 63;
        })
        ){
        checkEmailUser(email)
        .then((result) => {
            if (!result.rows[0]) {
                console.log('Result is: ');
                console.log(result.rows[0]);
                getHashPassword(password)
                    .then((hashedPass) => {
                        let sql = {
                            text: 'insert into customer (email, phonenumber, username, password, emailnotification) values($1, $2, $3, $4, $5) RETURNING id',
                            values: [email, phone, username, hashedPass, emailNotification]
                        };
                        pool.query(sql).then(data => {
                            let id = data.rows[0].id;
                            console.log("Created users id is : "+ id);
                            // use id to set up customer lists and customer grocery lists in mongo.
                            customer_grocery_list.create({list_id: id, grocery_list: []}, function(error, list) {
                                if (error) {          
                                    console.log("Found an error when creating grocery list for new user")
                                    console.log(err)
                                } else {
                                    // console.log(Response)
                                    console.log("Succesfully creates new grocery list for signed up user!")
                                    console.log(list)
                                }})
                            console.log("Added grocery list to mongo db!")
                            signUpEmail(email);
                            res.status(200).send(JSON.stringify({ msg: 'User signed up successfully', done: true }))
                        }, e => {
                            console.log(e)
                        })
                    }).catch((e) => {
                        console.log(e)
                        res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
                    })
            }
            else {
                res.status(400).send(JSON.stringify({ msg: 'Your email already exist in our files, so simply login with your password.' }))
            }
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
        }
        )
     }
     else{
        res.status(400).send(JSON.stringify({ msg: 'Invalid email.' }))

     }

    

}
