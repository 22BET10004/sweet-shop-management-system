import request from "supertest";
import app from "../src/app";

describe("Health Check", () => {
  it("should return 200 status", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
