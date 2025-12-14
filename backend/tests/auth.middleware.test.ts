import request from "supertest";
import app from "../src/app";

describe("Auth Middleware", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/protected");

    expect(res.status).toBe(401);
  });

  it("should allow access with token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer testtoken123");

    expect(res.status).toBe(200);
  });
});
