const mongoose = require('../database/database');
const bcrypt = require('bcryptjs');

const TransactionsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pokemonId: {
        type: Number,
        required: true
    },
    BTCDay: {
        type: String,
        required: true
    },
    quotas: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});

const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;