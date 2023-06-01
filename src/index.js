const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/route");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const multer = require("multer");

app.use(bodyParser.json());
app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(`${process.env.MONGODB_URL}/${process.env.DB}`)
mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

// edge case for api req
app.use((req, res, next) => {
  res.status(400).send({ status: false, error: "URL IS WRONG..." });
});

app.listen(process.env.PORT, function () {
  console.log("Express app running on port " + process.env.PORT);
});
