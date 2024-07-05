module.exports.verifyNumber = function (req, res, next) {
    const { Vonage } = require('@vonage/server-sdk');
    const vonage = new Vonage({
        apiKey: process.env.VONAGE_KEY,
        apiSecret: process.env.VONAGE_SECRET
    });

    console.log("Comes in verify file: ");

    vonage.verify.check(req.body.request_id, req.body.code)
        .then(resp => {
            console.log("prints response in then ");
            console.log(resp)
            // return resp;
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(err => {
            console.log("prints err in catch ");
            console.error(err)
            return res.status(500).send(err);
        });

    // next();
}