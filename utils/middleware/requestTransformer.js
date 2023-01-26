exports.transformArray = (req, res, next) => {
    // check if files exist
    if (req.files?.length > 0) {
        req.files.map((file) => {
            if (Array.isArray(req.body[file.fieldname])) {
                req.body[file.fieldname].push(file.location);
            } else {
                req.body[file.fieldname] = [];
                req.body[file.fieldname].push(file.location);
            }
        });
    }

    next();
};

exports.transformObject = (req, res, next) => {
    if (req.file) {
        req.body[file.fieldname] = req.ile.location;
        next();
    } else {
        next();
    }
};
