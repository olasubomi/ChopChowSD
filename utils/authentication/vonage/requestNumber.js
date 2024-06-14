module.exports.requestNumber = function (req, res) {
    const { Vonage } = require('@vonage/server-sdk');
    const vonage = new Vonage({
        apiKey: process.env.VONAGE_KEY,
        apiSecret: process.env.VONAGE_SECRET
    });

    console.log("Comes in request file: ");
    console.log(req.body.number);

    vonage.verify.start({ number: req.body.number, code_length: '6', brand: "Chop Chow" })
        .then(resp => {
            console.log(resp);
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(err => {
            console.log("Comes in catch ");
            console.error(err);
            // return err;
            return res.status(500).send(err);
        });
}