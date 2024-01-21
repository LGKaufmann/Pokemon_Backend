const axios = require("axios");
const { Types } = require("../db");

const getTypes = async (req, res) => {
  try {
    const arrayTypes = await Types.findAll();

    if (arrayTypes.length === 0) {
      //Types vacio
      try {
        const URL = "https://pokeapi.co/api/v2/type/";
        const { data } = await axios.get(URL);
        const arrayTypes = data.results.map((type) => {
          return { name: type.name };
        });
        await Types.bulkCreate(arrayTypes);
        res.status(200).json(arrayTypes);
      } catch (error) {
        return error;
      }
    } else {
      console.log("Types submited in DB!");
      return res.status(200).json(arrayTypes);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getTypes;
