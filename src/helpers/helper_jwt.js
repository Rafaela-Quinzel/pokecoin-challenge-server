const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
const secret = require('../config/secret');

async function generateToken(params = {}) {
    const expiresIn = dayjs().add(dayjs.duration(15, 'seconds')).unix();
    //const expiresIn = dayjs().add(dayjs.duration(1, 'days')).unix();

    return jwt.sign(params, secret.aes, {
        // expiresIn: 86400,
        expiresIn
    });
}


module.exports = {
    generateToken
}
