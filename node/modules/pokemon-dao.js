const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Gets the pokemon with the given id from the database.
 * If there is no such pokemon, undefined will be returned.
 * 
 * @param {number} id the id of the pokemon to get.
 * @returns the pokemon with the given id, or undefined if the pokemon doesn't exist.
 */
async function retrievePokemonById(id) {
    const db = await dbPromise;

    const pokemon = await db.get(SQL`
        select * from pokemon
        where id = ${id}`);

    return pokemon;
}

/**
 * Gets a random pokemon.
 * 
 * @returns a random pokemon
 */
async function retrieveRandomPokemon() {
    const random = Math.round(Math.random() * 150 + 1);
    return await retrievePokemonById(random);
}

async function retrieveRandomPokemonWithType(type) {
    const db = await dbPromise;

    const wildcard = `%${type}%`;

    const pokemon = await db.all(SQL`
        select * from pokemon
        where types LIKE ${wildcard}`);

    const i = Math.floor(Math.random() * pokemon.length);
    return pokemon[i];
}

// Export functions.
module.exports = {
    retrievePokemonById,
    retrieveRandomPokemon,
    retrieveRandomPokemonWithType
};
