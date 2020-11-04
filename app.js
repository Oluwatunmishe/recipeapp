const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const router = require("./route/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

const port = 1000;


app.get("*", (req, res) => {
  res.status(404).send("<h1>NOT FOUND</h1>");
});

app.listen(port, () => {
  mongoose
    .connect("mongodb://localhost/recipeapp", { useNewUrlParser: true ,useUnifiedTopology: true  })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(`app start @ localhost: ${port}`);
});
