const { checkEmail } = require('../../db/dbPostgress/queries/authentication/checkEmail');
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.authenticationLogin = (req, res, next) => {
    const memberInfo = { ...req.body }
    if (memberInfo) {
        checkEmail(memberInfo.email)
            .then((result) => {
                if (result.rows[0]) {
                    bcrypt.compare(memberInfo.password, result.rows[0].password, (err, valid) => {
                        if (valid) {
                            const { id, email } = { ...result.rows[0] }
                            const userInfoEnc = { id, email };
                            sign(userInfoEnc, process.env.SECRET, (err, result) => {
                                if (err) return res.json({ err });
                                const ll = res.cookie('JWTcustomerId', result, {
                                    maxAge: 60 * 60 * 24 * 30,
                                    httpOnly: true,
                                });
                                res.send({ error: null, data: result })
                            });
                        }
                        else {
                            res.status(400).send(JSON.stringify({ msg: 'check your password' }))
                        }
                    })
                } else{
                    res.status(400).send({ msg: 'email does not exist in database' });
                } 
            })
            .catch((err) => {
                console.log("Caught some issue within then statement");
                console.log(err);
                res.status(400).send(JSON.stringify({ msg: 'Ensure you enter validly data in your email ' }))
            })
    } else {
        console.log("Member info does not exists in db");

        res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
    }
}

