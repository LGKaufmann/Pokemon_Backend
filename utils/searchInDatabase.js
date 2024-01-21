const { Pokemon, Types } = require("../src/db");

const searchInDatabase = async () => {
  try {
    const arrayPokemon = await Pokemon.findAll({
      include: {
        attributes: ["name"],
        model: Types,
        through: {
          attributes: [],
        },
      },
    });

    return arrayPokemon;
  } catch (error) {
    return error;
  }
};

module.exports = searchInDatabase;
