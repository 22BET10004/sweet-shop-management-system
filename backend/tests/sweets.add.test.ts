import request from "supertest";
import app from "../src/app";

describe("Add Sweet", () => {
  it("should not allow adding sweet without token", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Laddu",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(res.status).toBe(401);
  });

  it("should add sweet with valid token", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer testtoken")
      .send({
        name: "Laddu",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Laddu");
  });
});
