const mongoose = require('../database/database');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        selected: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    wallet: {
        type: [
            {
                pokemonId: { type: Number, require: true },
                pokemonName: { type: String, required: true },
                pokemonImage: { type: String, required: true },
                pokemonBaseXP: { type: Number, required: true },
                pokemonTypes: { type: Object, required: true },
                quotas: { type: Number, require: true },
                value: { type: String, required: true },
            },
        ],
    },
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, secret.saltRounds);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;