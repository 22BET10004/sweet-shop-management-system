import request from "supertest";
import app from "../src/app";

describe("Sweet Inventory", () => {
  it("should purchase a sweet and reduce quantity", async () => {
    // Add sweet first (any authenticated user can add in current logic)
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer user-token")
      .send({
        name: "Barfi",
        category: "Indian",
        price: 20,
        quantity: 2,
      });

    const sweetId = addRes.body.id;

    // Purchase sweet
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer user-token");

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(1);
  });

  it("should not allow purchase when sweet is out of stock", async () => {
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer user-token")
      .send({
        name: "Kaju Katli",
        category: "Indian",
        price: 30,
        quantity: 0,
      });

    const sweetId = addRes.body.id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer user-token");

    expect(res.status).toBe(400);
  });

  it("should restock a sweet and increase quantity (ADMIN only)", async () => {
    // Add sweet as admin
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer admin-token")
      .send({
        name: "Jalebi",
        category: "Indian",
        price: 15,
        quantity: 5,
      });

    const sweetId = addRes.body.id;

    // Restock as admin
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", "Bearer admin-token")
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(10);
  });

  it("should block restock for non-admin user", async () => {
    const addRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer user-token")
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 18,
        quantity: 5,
      });

    const sweetId = addRes.body.id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", "Bearer user-token")
      .send({ quantity: 5 });

    expect(res.status).toBe(403);
  });
});
