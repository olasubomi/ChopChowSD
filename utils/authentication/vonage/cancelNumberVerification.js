module.exports.cancelNumberVerification = function (req, res) {
    const { Vonage } = require('@vonage/server-sdk');

    const vonage = new Vonage({
        apiKey: process.env.VONAGE_KEY,
        apiSecret: process.env.VONAGE_SECRET
    });

    vonage.verify.cancel(req.body.request_id)
        .then(resp => {
            console.error(resp);
            return res.status(200).send(resp);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        })
}