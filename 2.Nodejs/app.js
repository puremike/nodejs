const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Understanding Nodejs with Express</h1>"); //localhost:3000/
});

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>"); //localhost:3000/currenttime
});
app.listen(3000);
