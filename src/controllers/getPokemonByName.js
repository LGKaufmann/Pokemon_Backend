const searchInApiByName = require("../../utils/searchInApiByName");
const searchInDatabaseByName = require("../../utils/searchInDatabaseByName");
const getAllPokemons = require("../../utils/getAllPokemons");

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      // busqueda en la API externa
      let findPoke = await searchInApiByName(name);

      // busqueda en la base de datos
      if (findPoke.error) {
        // no encuentra en la api externa entonces se busca por BD
        findPoke = await searchInDatabaseByName(name);

        if (!findPoke) {
          return res.status(404).json({ message: "Pokemon not found" });
        }
      }
      return res.status(200).json(findPoke);
    }

    const allPokemons = await getAllPokemons();
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonByName;
