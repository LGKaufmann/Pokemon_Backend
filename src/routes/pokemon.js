const { Router } = require("express");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const postPokemon = require("../controllers/postPokemon");
const router = Router();

router.get("/:idPokemon", getPokemonById);
router.get("/", getPokemonByName);
router.post("/", postPokemon);

module.exports = router;
