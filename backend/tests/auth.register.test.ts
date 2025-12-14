import request from "supertest";
import app from "../src/app";

describe("Auth Register", () => {
  it("should return a token on successful registration", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token"); // 🔴 NEW EXPECTATION
  });
});
