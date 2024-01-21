const app = require("../../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /pokemons/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/pokemons/1").expect(200);
    });

    it("Responde un objeto con las propiedades: 'id','name','image', 'image2' y 'types' ", async () => {
      const response = (await agent.get("/pokemons/1")).body;
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response).toHaveProperty("image");
      expect(response).toHaveProperty("image2");
      expect(response).toHaveProperty("types");
    });
  });
});
