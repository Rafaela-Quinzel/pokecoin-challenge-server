const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const secret = require('../config/secret');

async function generateToken(params = {}) {
    const expiresIn = dayjs().add(dayjs.duration({'days' : 1})).unix();

    return jwt.sign(params, secret.aes, {
       // expiresIn: 86400,
        expiresIn
    });
}


module.exports = {
    generateToken
}
