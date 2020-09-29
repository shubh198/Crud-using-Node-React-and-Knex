const request = require("supertest");
const app = require("../routes/user");

describe("Test the root path", () => {
  test("GET /posts", () => {
    request(app)
      .get("/getuser")
      .expect()
      .then((res) => {
        expect(res.status).toEqual(200);
      });
  });
});
