const fs = require("fs"); //fileSystem Module
const path = require("path"); //Path Module

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //   res.send("<h1>Understanding Nodejs with Express</h1>"); //localhost:3000/
  res.send(
    "<form action='/store-user' method='POST'><label for='username'>UserNAME </label><input type='text' id='username' name='username'><hr><button type='reset'>Reset</button<hr><button type='submit'>Submit</button></form>"
  );
});

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>"); //localhost:3000/currenttime
});

app.post("/store-user", function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json"); //access the absolute file path
  const fileData = fs.readFileSync(filePath); //reads the file data
  const existingUsers = JSON.parse(fileData); //parse the file data to js code
  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //convert js code to json

  console.log(userName);
  res.send("<h1>Form Submitted Successfully!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json"); //access the absolute file path
  const fileData = fs.readFileSync(filePath); //reads the file data
  const existingUsers = JSON.parse(fileData); //parse the file data to js code

  let responseData = "<ul>";
  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";

  res.send(responseData);
});

app.listen(3000);
