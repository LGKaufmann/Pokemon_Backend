const searchInApi = require("./searchInApi");
const searchInDatabase = require("./searchInDatabase");

const getAllPokemons = async () => {
  try {
    let PokemonsInApi = await searchInApi();
    let PokemonsInDb = await searchInDatabase();

    return PokemonsInApi.concat(PokemonsInDb);
  } catch (error) {
    return error;
  }
};

module.exports = getAllPokemons;
