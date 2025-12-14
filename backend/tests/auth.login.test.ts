import request from "supertest";
import app from "../src/app";

describe("Auth Login", () => {
  it("should return a token on successful login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
