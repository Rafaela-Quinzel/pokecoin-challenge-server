const api = require('../config/api');
const axios = require('axios');

const helpers = require('../helpers/functions');
const CustomError = require('../helpers/customError');

class PokemonController {
    static async getById(req, res, next) {

        try {

            let pokemonId = req.params.id;

            const { data } = await axios.get(`${api.pokemonApi}pokemon/${pokemonId}`);

            if (!data) throw new CustomError('Pokemon not found', 404);

            let pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork']['front_default'],
                base_experience: data.base_experience,
                types: data.types
            }

            return res.status(200).json({ pokemon });

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

    // lista de pokemons do usuário
    static async getListByUser(req, res, next) {

        try {

            let userId = req.userId;

            const user = await helpers.getUserById(userId);
            const userPokemonList = user?.wallet;

            if (!userPokemonList) throw new CustomError('No pokemon found', 404);

            return res.status(200).json({ userPokemonList });

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }

    static async getAll(req, res, next) {

        try {

            const { limit, page } = req.query;

            const { data } = await axios.get(`${api.pokemonApi}pokemon?limit=${limit}&offset=${Number(page) * Number(limit)}`);

            Promise.all(data.results.map(async (pokemon) => {
                return await axios.get(`${pokemon.url}`).then(({ data: { id, name, sprites: { other }, base_experience, types } }) => {
                    return {
                        id,
                        name,
                        image: other['official-artwork']['front_default'],
                        base_experience,
                        types
                    }
                });

            })).then((pokemons) => {
                return res.status(200).json({ pokemons });
            });

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || 'Error on api' });
        }
    }
}

module.exports = PokemonController;