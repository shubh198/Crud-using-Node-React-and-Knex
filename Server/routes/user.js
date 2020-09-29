const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

router.get("/getuser", async (req, res) => {
  try {
    const user = await queries.users.getAll();
    if (user.length <= 0) {
      res.send({
        code: 404,
        msg: "User Not Found",
      });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send({
      code: 500,
      msg: "Internal Server Error",
    });
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const singleUser = await queries.users.getOne(req.params.id);
    if (!singleUser) {
      res.send({
        code: 404,
        msg: "User Not Found",
      });
    } else {
      res.send(singleUser);
    }
  } catch (error) {
    res.send({
      code: 500,
      msg: "Internal Server Error",
    });
  }
});

router.post("/registeruser", async (req, res) => {
  try {
    const registration = await queries.users.create(req.body);
    if (!registration) {
      res.send({
        code: 500,
        msg: "Internal Server Error",
      });
    } else {
      res.send({
        code: 200,
        msg: "Success",
      });
    }
  } catch (error) {
    res.send({
      code: 500,
      msg: "Internal Server Error",
    });
  }
});

router.patch("/updatedata/:id", async (req, res) => {
  try {
    const singleUser = await queries.users.update(req.body, req.params.id);
    if (!singleUser) {
      res.send({
        code: 404,
        msg: "User Not Found",
      });
    } else {
      res.send({ code: 200, msg: "Updated Success" });
    }
  } catch (error) {
    res.send({
      code: 500,
      msg: "Internal Server Error",
    });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const singleUser = await queries.users.delete(req.params.id);
    if (!singleUser) {
      res.send({
        code: 404,
        msg: "User Not Found",
      });
    } else {
      res.send({ code: 200, msg: "Deleted Success" });
    }
  } catch (error) {
    res.send({
      code: 500,
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
