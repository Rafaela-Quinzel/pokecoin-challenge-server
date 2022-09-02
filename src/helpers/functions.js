const User = require('../schemas/userSchema');
const Transactions = require('../schemas/transactionsSchema');


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
    getUserById,
    getTransactionsUser
} 
    