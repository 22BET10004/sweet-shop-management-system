import request from "supertest";
import app from "../src/app";

describe("Admin Only Logic", () => {
  it("should block restock for normal user", async () => {
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer usertoken")
      .send({
        name: "Peda",
        category: "Indian",
        price: 10,
        quantity: 5,
      });

    const sweetId = addRes.body.id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", "Bearer usertoken")
      .send({ quantity: 5 });

    expect(res.status).toBe(403);
  });

  it("should allow restock for admin user", async () => {
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer admin-token")
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 15,
        quantity: 5,
      });

    const sweetId = addRes.body.id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", "Bearer admin-token")
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(10);
  });
});
