const { Pokemon, Types } = require("../src/db");
const { Sequelize } = require("sequelize");

const searchInDatabaseByName = async (name) => {
  try {
    const findPokemon = await Pokemon.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("pokemon.name")),
        Sequelize.fn("lower", name)
      ),

      include: {
        attributes: ["name"],
        model: Types,
        through: {
          attributes: [],
        },
      },
    });

    return findPokemon;
  } catch (error) {
    return error;
  }
};

module.exports = searchInDatabaseByName;
