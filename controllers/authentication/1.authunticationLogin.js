const { checkEmail } = require('../../dbPostgress/queries/athuntication/checkEmail');
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.authenticationLogin = (req, res, next) => {
    const memberInfo = { ...req.body }
    if (memberInfo) {
        checkEmail(memberInfo.email)
            .then((result) => {
                if (result.rows[0]) {
                    bcrypt.compare(memberInfo.password, result.rows[0].password, (err, valid) => {
                        if (!valid) res.status(400).send(JSON.stringify({ msg: 'check your password' }))
                        const { id, email } = { ...result.rows[0] }
                        const userInfoEnc = { id, email };
                        const tokenCustomer = sign(userInfoEnc, process.env.SECRET);
                        console.log(tokenCustomer);
                        res.cookie('JWTcustomerId', tokenCustomer, {
                            maxAge: 60 * 60 * 24 * 30,
                            httpOnly: true,
                        });
                        res.status(200).send({ error: null, data: tokenCustomer });
                        next()
                    })
                } else res.status(400).send({ msg: 'email does not exist ' });
            })
            .catch(() => res.status(400).send(JSON.stringify({ msg: 'Ensure you enter validly data in your email ' })))
    } else {
        res.status(401).send(JSON.stringify({ msg: 'you not authrized in this page' }))
    }
}

