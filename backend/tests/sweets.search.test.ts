import request from "supertest";
import app from "../src/app";

describe("Search Sweets", () => {
  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", "Bearer testtoken");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
