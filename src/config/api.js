module.exports = {
    pokemonApi: process.env.POKEMON_HOST ? process.env.POKEMON_HOST : 'https://pokeapi.co/api/v2/',
    bitcoinApi: process.env.BITCOIN_HOST ? process.env.BITCOIN_HOST: 'https://www.mercadobitcoin.net/api/',
}