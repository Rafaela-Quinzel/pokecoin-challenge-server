const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const User = require('../models/userSchema');
const Transactions = require('../models/transactionsSchema');


async function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

async function getUserById(userId) {
    const user = await User.findOne({_id: userId});
    user.password = undefined;

    return user;
}

async function getTransactionsUser(userId) {
    const transactions = await Transactions.find({user: userId});

    return transactions;
}


module.exports = {
    generateToken,
    getUserById,
    getTransactionsUser
} 
    