exports.transformArray = (req, res, next) => {
    if (req?.files?.length > 0) {
        req?.files?.map((file) => {
            if (Array.isArray(req?.body[file?.fieldname])) {
                req?.body[file?.fieldname].push(file.location);
            } else {
                req.body[file.fieldname] = [];
                req?.body[file?.fieldname].push(file.location);

            }
            
        });
    }

    next();
};

exports.transformObject = (req, res, next) => {
    if (req.file) {
<<<<<<< HEAD
        req.body[file.fieldname] = req.file.location;
=======
        req.body[req.file.fieldname] = req.file.location;
>>>>>>> maroh-master
        next();
    } else {
        next();
    }
};
