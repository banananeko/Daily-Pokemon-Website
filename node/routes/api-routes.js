const express = require("express");
const router = express.Router();

const { incrementCallCountCookie } = require("../middleware/counter-cookie-middleware");
const { retrieveRandomPokemon, retrieveRandomPokemonWithType } = require("../modules/pokemon-dao");

/**
 * Whenever we make a GET request to /api/random, retrieve a random pokemon from the database and return
 * it as JSON. Using the counter-cookie-middleware, we will also increment the callCount cookie by 1.
 */
router.get("/api/random", incrementCallCountCookie, async function (req, res) {

    const pokemon = await retrieveRandomPokemon();
    res.json(pokemon);

});

/**
 * Whenever we make a POST request to /api/random, retrieve a random pokemon from the database which
 * has a type matching the type supplied in the request body, and return it as JSON.
 * Using the counter-cookie-middleware, we will also increment the callCount cookie by 1.
 * 
 * NOTE: In reality, this would probably be done using a GET request with a query parameter,
 * rather than a POST with a request body. I just wrote it this way so I could have an easy
 * example of how to send a POST request from Java.
 */
router.post("/api/random", incrementCallCountCookie, async function (req, res) {

    const pokemon = await retrieveRandomPokemonWithType(req.body.type);
    res.json(pokemon);
});

module.exports = router;