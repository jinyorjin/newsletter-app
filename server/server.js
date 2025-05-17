const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const weight = req.body.weight;
  const height = req.body.height;
  let bmi = Number(weight) / Math.pow(Number(height), 2);

  if (bmi < 18.5) {
    res.send("Underweight");
  } else if (bmi < 25) {
    res.send("Normal");
  } else if (bmi < 30) {
    res.send("Overweight");
  } else {
    res.send("Obese");
  }
});

app.listen(4000, function () {
  console.log("Server is running on port 4000");
});
