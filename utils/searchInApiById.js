const axios = require("axios");

const searchInApiById = async (id) => {
  const URL = "https://pokeapi.co/api/v2/pokemon";
  try {
    const findPokemonId = await axios.get(`${URL}/${id}`);

    if (findPokemonId) {
      let pkm = findPokemonId;
      return {
        id: pkm.data.id,
        name: pkm.data.name,
        image: pkm.data.sprites.other.dream_world.front_default,
        image2: pkm.data.sprites.other.home.front_default,
        hp: pkm.data.stats[0].base_stat,
        attack: pkm.data.stats[1].base_stat,
        defense: pkm.data.stats[2].base_stat,
        speed: pkm.data.stats[3].base_stat,
        height: pkm.data.height,
        weight: pkm.data.weight,
        types: pkm.data.types.map((ty) => {
          return { name: ty.type.name };
        }),
      };
    } else {
      return null;
    }
  } catch (error) {
    return { error: "Not found" };
  }
};

module.exports = searchInApiById;
