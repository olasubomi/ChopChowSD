const { checkEmail } = require('../../db/dbPostgress/queries/authentication/checkEmail');
const { addCustomer } = require('../../db/dbPostgress/queries/authentication/addCustomer')
const { customer } = require('../../db/dbMongo/config/db_buildSchema')
const { hashPassword } = require('../hashPassword')
const { sign } = require('jsonwebtoken')
exports.authenticationSignup = (req, res, next) => {
    const memberInfo = { ...req.body }
    const { newcustomerId } = req.params;
    const { firstname, lastname, email, password, phoneNumber, street, city, zipCode, ipsid } = memberInfo;
    if (memberInfo) {
        checkEmail(email)
            .then((result) => {
                if (!result.rows[0]) {
                    hashPassword(password)
                        .then((hashedPass) => {

                            var createNewCustomer = new customer({ id: newcustomerId, firstname: firstname, lastname: lastname, email: email, password: password, phoneNumber: phoneNumber, street: street, city: city, zipCode: zipCode, ipsid: ipsid })
                            addCustomer({ firstname, lastname, email, phoneNumber, street, city, zipCode, ipsid, password: hashedPass })


                                .then((result) => {

                                    if (result.rows[0]) {

                                        const resultEmail = result.rows[0].email
                                        const userInfoEnc = { resultEmail };
                                        sign(userInfoEnc, process.env.SECRET, (err, result) => {

                                            if (err) return res.json({ err });
                                            res.cookie('JWTcustomerId', result, {
                                                maxAge: 60 * 60 * 24 * 30,
                                                httpOnly: true,
                                            });

                                        });
                                        createNewCustomer.save((err, result) => {
                                            if (err) {
                                                res.status(500).send('internal server error');

                                            } else {

                                                res.status(200).send(JSON.stringify({ msg: 'add this customer succefully ' }))
                                            }
                                        })
                                    }
                                })
                        }).catch(() => res.status(500).send(JSON.stringify({ msg: 'Internal server error' })))

                }

                else {
                    res.status(400).send(JSON.stringify({ msg: 'your email is exist , so you must make login just ' }))


                }
            })
            .catch(() => res.status(500).send(JSON.stringify({ msg: 'Internal server error' })))


    } else {
        res.status(400).send(JSON.stringify({ msg: 'you should fill all data ' }))

    }
}
