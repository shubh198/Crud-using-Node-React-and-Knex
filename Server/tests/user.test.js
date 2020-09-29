const request = require("supertest");
const app = require("../routes/user");

describe("Test the root path", () => {
  test("It should response the /getuser route", async () => {
    const res = await request(app).get("/getuser");
    console.log(res);
    expect(res.statusCode).toBe(200);
  });
});
