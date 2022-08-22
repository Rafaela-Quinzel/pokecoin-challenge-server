const api = require('../config/api');
const axios = require('axios');

const helpers = require('../helpers/functions');

class PokemonController {
    static async getById(req, res, next) {

        try {

            let pokemonId = req.params.id;

            const { data } = await axios.get(`${api.pokemonApi}pokemon/${pokemonId}`);

            let pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork']['front_default'],
                base_experience: data.base_experience,
                types: data.types
            }

            return res.send({ pokemon });

        } catch (error) {
            return res.status(500).send({ error: 'Error on api' });
        }
    }

    // lista de pokemons do usuário
    static async getListByUser(req, res, next) {

        try {

            let userId = req.userId;

            const user = await helpers.getUserById(userId);
            const userPokemonList = user.wallet;
         
            return res.send({ userPokemonList });

        } catch (error) {
            return res.status(500).send({ error: 'Error on api' });
        }
    }

    static async getAll(req, res, next) {

        const { limit, page } = req.query;

        try {

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
                return res.send({ pokemons });
            });

        } catch (error) {
            return res.status(500).send({ error: 'Error on api' });
        }
    }
}

module.exports = PokemonController;