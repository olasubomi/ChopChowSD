exports.transformArray = (req, res, next) => {
    // console.log(req);
    // check if files exist
    if (req.files?.length > 0) {
        req.files.map((file) => {
            let fieldName = file.fieldname.slice(0, -1);
            if (Array.isArray(req.body[fieldName])) {
                req.body[fieldName].push(file.location);
            } else {
                req.body[fieldName] = [];
                req.body[fieldName].push(file.location);
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
