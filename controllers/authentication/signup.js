const { checkEmailUser, checkValideToken } = require('../../db/dbPostgress/queries/athuntication/checkEmail');
const pool = require('../../db/dbPostgress/config/db_connection')
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
    const { email, username } = req.body;
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
            res.status(400).send(JSON.stringify({ msg: 'your email does not exist.' }))
        }
    }).catch((e) => {
        res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
    })
};

exports.signupCustomer = (req, res, next) => {
    const { email, password, username, phone, emailNotifcation } = req.body;
    checkEmailUser(email)
        .then((result) => {

            if (!result.rows[0]) {
                getHashPassword(password)
                    .then((hashedPass) => {
                        let sql = {
                            text: 'insert into customer (email, phonenumber, username, password, emailnotification) values($1, $2, $3, $4, $5) RETURNING id',
                            values: [email, phone, username, hashedPass, emailNotifcation]
                        };

                        pool.query(sql).then(data => {
                            let id = data.rows[0].id;
                            signUpEmail(email);
                            res.status(200).send(JSON.stringify({ msg: 'User Sign up successfully', done: true }))
                        }, e => {
                            console.log(e)

                        })


                    }).catch((e) => {
                        console.log(e)

                        res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
                    })

            }

            else {
                res.status(400).send(JSON.stringify({ msg: 'your email is exist , so you must make login just ' }))


            }
        })
        .catch((e) => {
            console.log(e)

            res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
        }
        )

}
