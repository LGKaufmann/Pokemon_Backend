const searchDatabaseById = require("../../utils/searchDatabaseById");
const searchInApiById = require("../../utils/SearchInApiById");

const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;
  try {
    if (idPokemon) {
      let findPokemonId = null;

      if (isNaN(idPokemon)) {
        findPokemonId = await searchDatabaseById(idPokemon);
      } else {
        findPokemonId = await searchInApiById(idPokemon);
      }

      if (findPokemonId) {
        return res.status(200).json(findPokemonId);
      }
    }

    return res.status(404).json({ message: "Pokemon not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonById;
