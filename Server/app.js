const express = require("express");
const bodyparser = require("body-parser");
const user = require("./routes/user");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(user);
app.listen(process.env.PORT || 5000, () => {
  console.log(`listning ${process.env.PORT}`);
});
