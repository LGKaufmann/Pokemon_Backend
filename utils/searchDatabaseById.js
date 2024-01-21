const { Pokemon, Types } = require("../src/db");

const searchDatabaseById = async (id) => {
  try {
    const findPokemonId = await Pokemon.findOne({
      where: {
        id: id,
      },
      include: {
        attributes: ["name"],
        model: Types,
      },
    });

    return findPokemonId;
  } catch (error) {
    return null;
  }
};

module.exports = searchDatabaseById;
