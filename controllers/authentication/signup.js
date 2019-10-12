const { checkEmailUser } = require('../../db/dbPostgress/queries/athuntication/checkEmail');
const pool  = require('../../db/dbPostgress/config/db_connection')
const { getHashPassword } = require('../hashPassword')
const { sign } = require('jsonwebtoken')
exports.signupCustomer = (req, res, next) => {
    const { email, password, username, phone, emailNotifcation } = req.body;
    checkEmailUser(email)
            .then((result) => {
                debugger
                if (!result.rows[0]) {
                    getHashPassword(password)
                        .then((hashedPass) => {
                            let sql = {
                                text: 'insert into users (email, phone, username, password, emailnotifcation) values($1, $2, $3, $4, $5)',
                                values: [email, phone, username, hashedPass, emailNotifcation]
                            };

                            pool.query(sql).then(data => {
                                res.status(200).send(JSON.stringify({ msg: 'User Sign up successfully', done: true }))
                            }, e => {
                                console.log(e)
                                debugger
                            })

                            
                        }).catch((e) => {
                            console.log(e)
                            debugger
                            res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
                        })

                }

                else {
                    res.status(400).send(JSON.stringify({ msg: 'your email is exist , so you must make login just ' }))


                }
            })
            .catch((e) => {
                console.log(e)
                debugger
                res.status(500).send(JSON.stringify({ msg: 'Internal server error' }))
        }
            )

}
