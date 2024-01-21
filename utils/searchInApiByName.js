const axios = require("axios");

const searchInApiByName = async (name) => {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon";
    const findPokemon = await axios.get(`${URL}/${name}`);

    if (findPokemon) {
      let pok = findPokemon;
      return {
        id: pok.data.id,
        name: pok.data.name,
        image: pok.data.sprites.other.dream_world.front_default,
        image2: pok.data.sprites.other.home.front_default,
        hp: pok.data.stats[0].base_stat,
        attack: pok.data.stats[1].base_stat,
        defense: pok.data.stats[2].base_stat,
        speed: pok.data.stats[3].base_stat,
        height: pok.data.height,
        weight: pok.data.weight,
        types: pok.data.types.map((ty) => {
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

module.exports = searchInApiByName;
