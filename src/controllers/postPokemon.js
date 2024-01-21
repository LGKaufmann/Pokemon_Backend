const { Pokemon, Types } = require("../db");
const searchInApiByName = require("../../utils/searchInApiByName");
const searchInDatabaseByName = require("../../utils/searchInDatabaseByName");

const postPokemon = async (req, res) => {
  const {
    name,
    image,
    image2,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
  } = req.body;

  if (!name || !image) {
    return res.status(404).json({ error: "Name and image required" });
  }

  let NotAvailablePokemon = await searchInApiByName(name);

  if (NotAvailablePokemon.error) {
    NotAvailablePokemon = await searchInDatabaseByName(name);
  }

  if (NotAvailablePokemon) {
    return res.status(400).json({ error: "Name of Pokemon is already exists" });
  }

  try {
    const newPokemon = await Pokemon.create(req.body);

    if (newPokemon && types && Array.isArray(types)) {
      const promises = types.map(async (typ) => {
        let type = await Types.findAll({
          where: { name: typ.name },
        });

        return newPokemon.setTypes(type);
      });

      await Promise.all(promises);
    }

    let resultPokemon = await Pokemon.findAll({
      where: {
        name: name,
      },
      include: [
        {
          model: Types,
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(201).json(resultPokemon[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemon;
