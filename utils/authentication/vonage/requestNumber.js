async function loadVonage() {
    const { Vonage } = await import('@vonage/server-sdk');
    return new Vonage({
        apiKey: process.env.VONAGE_KEY,
        apiSecret: process.env.VONAGE_SECRET
    });
}
module.exports.requestNumber = async function (req, res) {
    const vonage = await loadVonage()

    console.log("Comes in request file: ");
    console.log(req.body.number);

    vonage.verify.start({ number: req.body.number, brand: "Chop Chow", code_length: '6' })
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