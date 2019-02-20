'use strict';

const crypto = require('crypto');

class Security {
    static md5(value) {
        if(!value) {
            return;
        }
        return crypto.createHash('md5').update(value).digest('hex');
    }

// Nonce is a term used by WordPress to identify a unique session token in web forms upon submission.
// In this case we're using the session ID and the user agent string to create a single MD5 string.
    static isValidNonce(value, req) {
        return (value === this.md5(req.sessionID + req.headers['user-agent']));
    }

    static generateId() {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        let template = '%'.repeat(16);
        return timestamp + template.replace(/[%]/g, () => {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}

module.exports = Security;