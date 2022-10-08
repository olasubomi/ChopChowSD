const Validators = require("../validators");

exports.validatePayload = function (validator) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`);

    return async function (req, res, next) {

        try {
            let filesArray = [];
            if (req.file) {
                req.body[req.file.fieldname] = req.file.location;

            }
            if (req.files) {
                req.files.map((file) => filesArray.push(file.location));

                req.body[req.files[0].fieldname] = filesArray;
            }

            const validated = await Validators[validator].validateAsync(
                req.body
            );
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) {

                res.status(400).json({ message: err.message });

            } else {
                res.status(500).json({

                    message: err?.message || "internal server error",

                });
            }
        }
    };
};
