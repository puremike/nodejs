//import path, fs, and express modules
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

//import some important middleware
app.use(express.urlencoded({ extended: false })); //allow more than one incoming requests
app.use(express.static(__dirname, +"public")); //access static files, including css styles,medias, pictures, and others

//request and response
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index", "index.html"));
});

app.post("/store-users", function (req, res) {
  const userDetails = {
    userName: req.body.username,
    userEmail: req.body.useremail,
    userLocation: req.body.userlocation,
  };
  const filePath = path.join(__dirname, "data", "users.json"); //access filePath
  const fileData = fs.readFileSync(filePath); //read data in file path
  const existingUsers = JSON.parse(fileData); //parse the data into JS code
  existingUsers.push(userDetails); //add the contents of the userDetails into the const existingUsers
  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //convert the data to a json (JavaScript Notation) format

  console.log(userDetails);
  res.send("<h1>Success!</h1>");
});

app.get("/ct", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.listen(PORT);
console.log("Server is open at port: " + PORT);
