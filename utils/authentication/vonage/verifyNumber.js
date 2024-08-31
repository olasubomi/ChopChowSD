const { Vonage } = require('@vonage/server-sdk');
module.exports.verifyNumber = function (req, res, next) {
    const vonage = new Vonage({
        apiKey: process.env.VONAGE_KEY,
        apiSecret: process.env.VONAGE_SECRET
    });

    console.log("Comes in verify file: ");
    console.log("Comes in verify file: ", req.body.request_id);

    return vonage.verify.check(req.body.request_id, req.body.code)
        .then(resp => {
            console.log("prints response in then ");
            if (resp?.status !== '0') {
                throw new Error(resp?.error_text)
            }
            console.log(resp)
            return resp
            //return res.status(200).send(JSON.stringify(resp));
        })
        .catch(err => {
            console.log("prints err in catch ");
            console.error(err)
            throw new Error(err)
        });

    // next();
}