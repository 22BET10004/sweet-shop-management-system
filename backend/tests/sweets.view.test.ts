import request from "supertest";
import app from "../src/app";

describe("View Sweets", () => {
  it("should block viewing sweets without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(401);
  });

  it("should return list of sweets with token", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", "Bearer testtoken");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
