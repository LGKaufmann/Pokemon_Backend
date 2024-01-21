const { Pokemon, conn } = require("../../src/db.js");

describe("Modelo de Pokémon", () => {
  beforeAll(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos:", err);
    })
  );

  describe("Validadores", () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe("nombre", () => {
      it("debería lanzar un error si el nombre es nulo", async () => {
        expect.assertions(1);
        try {
          await Pokemon.create({});
        } catch (error) {
          expect(error.message).toBe(
            "notNull Violation: pokemon.name cannot be null"
          );
        }
      });

      it("debería funcionar cuando tiene un nombre válido", async () => {
        const pokemon = await Pokemon.create({ name: "Pikachu" });
        expect(pokemon.name).toBe("Pikachu");
      });
    });
  });
});
