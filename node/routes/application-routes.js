const express = require("express");
const router = express.Router();

const { incrementCallCountCookie } = require("../middleware/counter-cookie-middleware");
const { retrieveRandomPokemon } = require("../modules/pokemon-dao");

/**
 * Whenever we make a GET request to /, render the "home" view with a random pokemon.
 * Using the counter-cookie-middleware, we will also increment the callCount cookie by 1.
 */
router.get("/", incrementCallCountCookie, async function (req, res) {

    const pokemon = await retrieveRandomPokemon();
    res.locals.pokemon = pokemon;

    res.render("home");

});

module.exports = router;