const api = require('../config/api');
const axios = require('axios');

const User = require('../models/userSchema');
const helpers = require('../helpers/functions');
const transactions = require('../models/transactionsSchema');

class TransactionsController {

    // comprar 
    static async createPurchase(req, res, next) {

        try {

            let userId = req.userId;

            const { pokemonId } = req.body.pokemon.id;

            const user = await helpers.getUserById(userId);
            const userWallet = user?.wallet;
            const verifyUserHasPokemon = userWallet.find(wallet => wallet.pokemonId === pokemonId);

            if (verifyUserHasPokemon) {

                let { quotas, value } = verifyUserHasPokemon;

                quotas = quotas + req.body.info.quotas;

                const newValue = Number(value) + Number(req.body.info.value);

                value = newValue.toString();

                const updatePokemon = await User.updateOne(
                    { _id: userId, "wallet.pokemonId": verifyUserHasPokemon.pokemonId },
                    {
                        '$set': {
                            "wallet.$.quotas": quotas,
                            "wallet.$.value": value
                        }
                    });

                const data = {
                    user: userId,
                    type: req.body.type,
                    name: req.body.pokemon.name,
                    pokemonId: req.body.pokemon.id,
                    BTCDay: req.body.info.BTCDay,
                    quotas: req.body.info.quotas,
                    value: req.body.info.value,
                };

                await transactions.create(data);

                return res.json(updatePokemon);

            } else if (!verifyUserHasPokemon) {

                const updateWallet = await User.updateOne({ _id: userId }, {
                    $push: {
                        wallet: {
                            pokemonId: req.body.pokemon.id,
                            pokemonName: req.body.pokemon.name,
                            pokemonImage: req.body.pokemon.image,
                            pokemonBaseXP: req.body.pokemon.baseXP,
                            pokemonTypes: req.body.pokemon.types,
                            quotas: req.body.info.quotas,
                            value: req.body.info.value,
                        }
                    }
                });

                const data = {
                    user: userId,
                    type: req.body.type,
                    name: req.body.pokemon.name,
                    pokemonId: req.body.pokemon.id,
                    BTCDay: req.body.info.BTCDay,
                    quotas: req.body.info.quotas,
                    value: req.body.info.value,
                };

                await transactions.create(data);

                return res.json(updateWallet);
            }

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

    //vender
    static async createSell(req, res, next) {
        try {

            let userId = req.userId;

            const pokemonId = req.body.pokemon.id;

            const user = await helpers.getUserById(userId);
            const userWallet = user?.wallet;

            const verifyUserHasPokemon = userWallet.find(wallet => wallet.pokemonId === pokemonId);

            let { quotas, value } = verifyUserHasPokemon;

            quotas = quotas - req.body.info.quotas;

            const newValue = Number(value) - Number(req.body.info.value);

            value = newValue.toString();

            if (quotas === 0) {
                const removePokemon = await User.updateOne(
                    { _id: userId, "wallet.pokemonId": verifyUserHasPokemon.pokemonId },
                    {
                        $pull: {
                            wallet: {
                                pokemonID: verifyUserHasPokemon.pokemonId,
                                pokemonName: verifyUserHasPokemon.name,
                                pokemonImage: verifyUserHasPokemon.image,
                                pokemonBaseXP: verifyUserHasPokemon.baseXP,
                                pokemonTypes: verifyUserHasPokemon.types,
                                quotas: verifyUserHasPokemon.quotas,
                                value: verifyUserHasPokemon.value,
                            }
                        }
                    });

                const data = {
                    user: userId,
                    type: req.body.type,
                    name: req.body.pokemon.name,
                    pokemonId: req.body.pokemon.id,
                    BTCDay: req.body.info.BTCDay,
                    quotas: req.body.info.quotas,
                    value: req.body.info.value,
                };

                await transactions.create(data);

                return res.json(removePokemon);

            } else {
                const updatePokemon = await User.updateOne(
                    { _id: userId, "wallet.pokemonId": verifyUserHasPokemon.pokemonId },
                    {
                        '$set': {
                            "wallet.$.quotas": quotas,
                            "wallet.$.value": value
                        }
                    })

                const data = {
                    user: userId,
                    type: req.body.type,
                    name: req.body.pokemon.name,
                    pokemonId: req.body.pokemon.id,
                    BTCDay: req.body.info.BTCDay,
                    quotas: req.body.info.quotas,
                    value: req.body.info.value,
                };

                await transactions.create(data);

                return res.json(updatePokemon);
            }

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

    static async getTansations(req, res, next) {
        try {
            let userId = req.userId;

            const transactions = await helpers.getTransactionsUser(userId);

            return res.json(transactions);

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

    // Retorna informações com o resumo das últimas 24 horas de negociações.
    static async getHistoryTicker(req, res, next) {

        try {

            const { data } = await axios.get(`${api.bitcoinApi}BTC/ticker/`);

            return res.json(data);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Histórico de negociações realizadas.
    static async getHistoryTrades(req, res, next) {

        try {

            const { data } = await axios.get(`${api.bitcoinApi}BTC/trades/`);

            return res.json(data);

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

}

module.exports = TransactionsController;